import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { Router } from 'next/router'
import { getTranslations } from 'next-intl/server'
import { Tokens } from '@/shared/api/types/tokens'
import { API_URL, AUTH_LOGOUT_URL, AUTH_REFRESH_URL } from './config'
import HTTP_CODES_ENUM from '@/shared/api/types/http-codes'
import { redirect } from '../../i18n/routing'
import { getAccessToken, removeAccessToken } from './helpers/auth.helper'

const AUTH_TOKEN_KEY = 'auth-token-data'

export type TokensInfo = Tokens | null
export type RefreshTokenType = Promise<AxiosResponse<any, any>> | null

const tokens = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? 'null') as TokensInfo

let refreshingTokens: RefreshTokenType = null

export const protectedAPI = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

function refreshTokens() {
  return protectedAPI.post('/v1/auth/refresh')
}
protectedAPI.interceptors.request.use(config => {
  const accessToken = tokens?.token

  if (config && config.headers)
    if (accessToken)
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

protectedAPI.interceptors.response.use(
  res => res,
  async error => {
    const t = await getTranslations('default.Errors')
    const { config } = error
    if (error.response) {
      if (
        error.response.status === HTTP_CODES_ENUM.UNAUTHORIZED &&
        !config.isRetry
      ) {
        config.isRetry = true
        try {
          if (!refreshingTokens) {
            refreshingTokens = refreshTokens()
          }

          await refreshingTokens
          refreshingTokens = null
          return protectedAPI(config)
        } catch (err) {
          refreshingTokens = null
          removeAccessToken()
          Router.push({
            pathname: '/auth/signin',
            query: {
              error: 'unauthorized',
              redirect: Router.pathname,
            },
          })
          return false
        }
      }

      const errData = {
        message: error.response?.data?.message || t('unknown-server'),
        status: error.response.status,
      }

      // Это если удалось обновить токены, но сервер все равно не пускает
      if (errData.status === 401) {
        Router.push({
          pathname: '/auth/signin',
          query: {
            error: 'unauthorized',
            redirect: Router.pathname,
          },
        })
        Cookies.remove('accessToken')
        return false
      }

      return Promise.reject(errData)
    }

    if (error.request)
      return Promise.reject(new Error(t('server-not-responsed')))

    return Promise.reject(new Error(t('error-client')))
  },
)

// export const publicAPI = axios.create({
//   withCredentials: true,
//   baseURL: API_URL,
// })

// const baseAPI = axios.create({
//   withCredentials: true,
//   baseURL: API_URL,
// })

// if (tokens?.token) {
//   baseAPI.interceptors.request.use(
//     config => {
//       config.headers.Authorization = `Bearer ${tokens.token}`

//       return config
//     },
//     error => {
//       return Promise.reject(error)
//     },
//   )
// }

// // creating refreshing status to execute request when refreshing
// let isRefreshing = false
// let failedQueue: any[] = []

// const processQueue = (error: any, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error)
//     } else {
//       prom.resolve(token)
//     }
//   })

//   failedQueue = []
// }

// baseAPI.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config

//     if (
//       error.response.status === HTTP_CODES_ENUM.UNAUTHORIZED &&
//       !originalRequest._retry
//     ) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject })

//           if (
//             originalRequest.url === AUTH_REFRESH_URL &&
//             error.response.status === HTTP_CODES_ENUM.UNAUTHORIZED
//           ) {
//             publicAPI.post(AUTH_LOGOUT_URL).catch(() => {
//               console.log(window.location.pathname)
//               redirect('/auth/signin')
//             })
//             redirect('/auth/signin')
//           }
//         })
//           .then(token => {
//             originalRequest.headers.Authorization = `Bearer ${token}`
//             return baseAPI(originalRequest)
//           })
//           .catch(err => {
//             redirect('/auth/signin')
//             return Promise.reject(err)
//           })
//       }

//       originalRequest._retry = true
//       isRefreshing = true

//       return new Promise((resolve, reject) => {
//         const newTokens = baseAPI
//           .post(AUTH_REFRESH_URL, { refreshToken: tokens?.refreshToken })
//           .then(({ data }) => {
//             Cookies.set(AUTH_TOKEN_KEY, data)
//             baseAPI.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`
//             originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
//             processQueue(null, data.accessToken)
//             resolve(baseAPI(originalRequest))
//           })
//           .catch(err => {
//             processQueue(err, null)
//             reject(err)
//           })
//           .finally(() => {
//             isRefreshing = false
//           })
//         originalRequest.headers['Authorization'] =
//           `Bearer ${newTokens.refreshToken}`
//         return baseAPI(originalRequest)
//       })
//       // } catch (err) {
//       //   await baseAPI
//       //     .get(AUTH_LOGOUT_URL)
//       //     .then(() => {
//       //       redirect('/auth/signin')
//       //     })
//       //     .catch(() => {
//       //       redirect('/auth/signin')
//       //     })
//       //   return Promise.reject(err)
//       // }
//     }
//     return Promise.reject(error)

//     // if (tokens?.tokenExpires && tokens.tokenExpires <= Date.now()) {
//     //   const newTokens = baseAPI
//     //     .post(AUTH_REFRESH_URL, { refreshToken: tokens.refreshToken })
//     //     .then(res => res.data)

//     //   if (newTokens.token) {
//     //     tokens?.setTokensInfo?.({
//     //       token: newTokens.token,
//     //       refreshToken: newTokens.refreshToken,
//     //       tokenExpires: newTokens.tokenExpires,
//     //     })

//     //     headers.Authorization = `Bearer ${newTokens.token}`
//     //   } else {
//     //     tokens?.setTokensInfo?.(null)
//     //     throw new Error('Refresh token expired')
//     //   }
//     // }
//   },
// )

// export default baseAPI
