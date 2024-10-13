'use client'

import { useEffect, useState, PropsWithChildren } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from '../../i18n/routing'
import { Tokens } from '@/shared/api/types/tokens'
import { removeAccessToken } from '../api/helpers/auth.helper'
import { protectedAPI } from '../api'
import Loader from '../ui/loader'

type TokensInfo = Tokens | null

const AuthProvider = (props: PropsWithChildren<{}>) => {
  const router = useRouter()
  const [prevRouter, setPrevRouter] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const AUTH_TOKEN_KEY = 'auth-token-data'

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      const tokens = JSON.parse(
        Cookies.get(AUTH_TOKEN_KEY) ?? 'null',
      ) as TokensInfo

      const accessToken = tokens?.token
      if (!accessToken) return router.push('/auth/signin')

      try {
        if (tokens?.tokenExpires && tokens.tokenExpires <= Date.now()) {
          await protectedAPI.post('/auth/refresh-tokens')
        }
      } catch (error) {
        removeAccessToken()
        return router.push('/auth/signin')
      }

      setTimeout(() => setIsLoading(false), 300)
      setPrevRouter(router.pathname)
    })()
  }, [router.pathname])

  if (isLoading || prevRouter !== router.pathname) return <Loader />

  return (
    <>
      {/* <ModalTelegramBotIntegration
        isOpen={isOpen}
        onClose={onClose}
        accessClose={false}
      /> */}

      {props.children}
    </>
  )
}

export default AuthProvider
