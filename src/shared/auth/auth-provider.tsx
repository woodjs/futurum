'use client'

import { Tokens } from '@/shared/api/types/tokens'
import { User } from '@/shared/api/types/user'
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  AuthActionsContext,
  AuthContext,
  AuthTokensContext,
  TokensInfo,
} from './auth-context'
import Cookies from 'js-cookie'
import useFetchBase from '@/shared/api/use-fetch-base'
import { AUTH_LOGOUT_URL, AUTH_ME_URL } from '@/shared/api/config'
import HTTP_CODES_ENUM from '../api/types/http-codes'
import { useRouter } from '../../i18n/routing'

function AuthProvider(props: PropsWithChildren<{}>) {
  const AUTH_TOKEN_KEY = 'auth-token-data'
  const [tabId] = useState(() => Math.random().toString(36).slice(2))
  const [broadcastChannel] = useState(
    () => new BroadcastChannel(AUTH_TOKEN_KEY),
  )
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const tokensInfoRef = useRef<Tokens>({
    token: null,
    refreshToken: null,
    tokenExpires: null,
  })
  const fetchBase = useFetchBase()

  const setTokensInfoRef = useCallback((tokens: TokensInfo) => {
    tokensInfoRef.current = tokens ?? {
      token: null,
      refreshToken: null,
      tokenExpires: null,
    }
  }, [])

  const setTokensInfo = useCallback(
    (tokensInfo: TokensInfo) => {
      setTokensInfoRef(tokensInfo)
      broadcastChannel.postMessage({
        tabId,
        tokens: tokensInfo,
      })

      if (tokensInfo) {
        Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(tokensInfo))
      } else {
        Cookies.remove(AUTH_TOKEN_KEY)
        setUser(null)
      }
    },
    [setTokensInfoRef, broadcastChannel, tabId],
  )

  const logOut = useCallback(async () => {
    await fetchBase(AUTH_LOGOUT_URL, {
      method: 'POST',
    })
      .then(() => {})
      .catch(() => {})

    // router.push('/auth/signin')

    setTokensInfo(null)
  }, [setTokensInfo, fetchBase])

  const loadData = useCallback(async () => {
    const tokens = JSON.parse(
      Cookies.get(AUTH_TOKEN_KEY) ?? 'null',
    ) as TokensInfo

    setTokensInfoRef(tokens)

    try {
      if (tokens?.token) {
        const response = await fetchBase(
          AUTH_ME_URL,
          {
            method: 'GET',
          },
          {
            token: tokens.token,
            refreshToken: tokens.refreshToken,
            tokenExpires: tokens.tokenExpires,
            setTokensInfo,
          },
        )

        if (response.status === HTTP_CODES_ENUM.UNAUTHORIZED) {
          logOut()
          return
        }

        const data = await response.json()
        setUser(data)
      } else {
        logOut()
      }
    } catch {
      logOut()
    } finally {
      setIsLoaded(true)
    }
  }, [fetchBase, logOut, setTokensInfoRef, setTokensInfo])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    const onMessage = (
      event: MessageEvent<{
        tabId: string
        tokens: TokensInfo
      }>,
    ) => {
      if (event.data.tabId === tabId) return

      if (!event.data.tokens) setUser(null)
      setTokensInfoRef(event.data.tokens)
    }

    broadcastChannel.addEventListener('message', onMessage)

    return () => {
      broadcastChannel.removeEventListener('message', onMessage)
    }
  }, [broadcastChannel, setTokensInfoRef, tabId])

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
    }),
    [isLoaded, user],
  )

  const contextActionsValue = useMemo(
    () => ({
      setUser,
      logOut,
    }),
    [logOut],
  )

  const contextTokensValue = useMemo(
    () => ({
      tokensInfoRef,
      setTokensInfo,
    }),
    [setTokensInfo],
  )

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthActionsContext.Provider value={contextActionsValue}>
        <AuthTokensContext.Provider value={contextTokensValue}>
          {props.children}
        </AuthTokensContext.Provider>
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  )
}

export default AuthProvider
