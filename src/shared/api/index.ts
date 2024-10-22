import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { Router } from 'next/router'
// import { getTranslations } from 'next-intl/server'
import { Tokens } from '@/shared/api/types/tokens'
import { API_URL, AUTH_LOGOUT_URL, AUTH_REFRESH_URL } from './config'
import HTTP_CODES_ENUM from '@/shared/api/types/http-codes'
import { redirect } from '../../i18n/routing'
import {
  getAccessToken,
  redirectToSignIn,
  removeAccessToken,
} from './helpers/auth.helper'

const AUTH_TOKEN_KEY = 'auth-token-data'
export type TokensInfo = Tokens | null
export type RefreshTokenType = any | null

const tokens = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? 'null') as TokensInfo
const locale = Cookies.get('NEXT_LOCALE')

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
    // const t = await getTranslations('default.Errors')
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

          await refreshingTokens()
          refreshingTokens = null
          return protectedAPI(config)
        } catch (err) {
          refreshingTokens = null
          removeAccessToken()

          redirectToSignIn(locale)
          return false
        }
      }

      const errData = {
        message: error.response?.data?.message || 'Uknnown server error',
        status: error.response.status,
      }

      // Это если удалось обновить токены, но сервер все равно не пускает
      if (errData.status === 401) {
        Cookies.remove('accessToken')
        redirectToSignIn(locale)
        return false
      }

      return Promise.reject(errData)
    }

    if (error.request) return Promise.reject(new Error('server-not-responsed'))

    return Promise.reject(new Error('error-client'))
  },
)
