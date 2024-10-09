'use client'

import { useCallback } from 'react'
import { Tokens } from './types/tokens'
import { TokensInfo } from '../auth/auth-context'
import { API_URL, AUTH_REFRESH_URL } from './config'
import { FetchInputType, FetchInitType } from './types/fetch-params'
// import useLanguage from '../i18n/use-language'
import axios, { AxiosRequestConfig } from 'axios'

function useFetchBase() {
  // const language = useLanguage()

  const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
  })

  return useCallback(
    async (
      input: FetchInputType,
      init?: FetchInitType,
      tokens?: Tokens & {
        setTokensInfo?: (tokensInfo: TokensInfo) => void
      },
    ) => {
      let headers: Record<string, string> = {
        'x-custom-lang': 'en',
      }

      if (!(init?.body instanceof FormData)) {
        headers = {
          ...headers,
          'Content-Type': 'application/json',
        }
      }

      if (tokens?.token) {
        headers.Authorization = `Bearer ${tokens.token}`
      }

      if (tokens?.tokenExpires && tokens.tokenExpires <= Date.now()) {
        const newTokens = await axios
          .post(
            AUTH_REFRESH_URL,
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokens.refreshToken}`,
              },
            },
          )
          .then(res => res.data)

        if (newTokens.token) {
          tokens?.setTokensInfo?.({
            token: newTokens.token,
            refreshToken: newTokens.refreshToken,
            tokenExpires: newTokens.tokenExpires,
          })

          headers.Authorization = `Bearer ${newTokens.token}`
        } else {
          tokens?.setTokensInfo?.(null)
          throw new Error('Refresh token expired')
        }
      }

      // Ensure input is a string for the URL
      const url = typeof input === 'string' ? input : String(input)

      const config: AxiosRequestConfig = {
        method: init?.method || 'GET',
        url,
        data: init?.body,
        headers: headers as Record<string, string>,
      }

      return instance(config)
    },
    [instance],
  )
}

export default useFetchBase
