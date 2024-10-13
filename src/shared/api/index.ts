import axios from 'axios'
import Cookies from 'js-cookie'
import { Tokens } from '@/shared/api/types/tokens'
import { API_URL, AUTH_LOGOUT_URL, AUTH_REFRESH_URL } from './config'
import HTTP_CODES_ENUM from '@/shared/api/types/http-codes'
import { redirect } from '../../i18n/routing'

const AUTH_TOKEN_KEY = 'auth-token-data'

export type TokensInfo = Tokens | null

const tokens = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? 'null') as TokensInfo

export const publicAPI = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

const baseAPI = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

if (tokens?.token) {
  baseAPI.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${tokens.token}`

      return config
    },
    error => {
      return Promise.reject(error)
    },
  )
}

// creating refreshing status to execute request when refreshing
let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

baseAPI.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (
      error.response.status === HTTP_CODES_ENUM.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })

          if (
            originalRequest.url === AUTH_REFRESH_URL &&
            error.response.status === HTTP_CODES_ENUM.UNAUTHORIZED
          ) {
            publicAPI.post(AUTH_LOGOUT_URL).catch(() => {
              console.log(window.location.pathname)
              redirect('/auth/signin')
            })
            redirect('/auth/signin')
          }
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return baseAPI(originalRequest)
          })
          .catch(err => {
            redirect('/auth/signin')
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      return new Promise((resolve, reject) => {
        const newTokens = baseAPI
          .post(AUTH_REFRESH_URL, { refreshToken: tokens?.refreshToken })
          .then(({ data }) => {
            Cookies.set(AUTH_TOKEN_KEY, data)
            baseAPI.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
            processQueue(null, data.accessToken)
            resolve(baseAPI(originalRequest))
          })
          .catch(err => {
            processQueue(err, null)
            reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
        originalRequest.headers['Authorization'] =
          `Bearer ${newTokens.refreshToken}`
        return baseAPI(originalRequest)
      })
      // } catch (err) {
      //   await baseAPI
      //     .get(AUTH_LOGOUT_URL)
      //     .then(() => {
      //       redirect('/auth/signin')
      //     })
      //     .catch(() => {
      //       redirect('/auth/signin')
      //     })
      //   return Promise.reject(err)
      // }
    }
    return Promise.reject(error)

    // if (tokens?.tokenExpires && tokens.tokenExpires <= Date.now()) {
    //   const newTokens = baseAPI
    //     .post(AUTH_REFRESH_URL, { refreshToken: tokens.refreshToken })
    //     .then(res => res.data)

    //   if (newTokens.token) {
    //     tokens?.setTokensInfo?.({
    //       token: newTokens.token,
    //       refreshToken: newTokens.refreshToken,
    //       tokenExpires: newTokens.tokenExpires,
    //     })

    //     headers.Authorization = `Bearer ${newTokens.token}`
    //   } else {
    //     tokens?.setTokensInfo?.(null)
    //     throw new Error('Refresh token expired')
    //   }
    // }
  },
)

export default baseAPI
