import Cookies from 'js-cookie'
import { enqueueSnackbar } from 'notistack'

const AUTH_TOKEN_KEY = 'auth-token-data'

export const getAccessToken = () => {
  const tokens = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? 'null')

  return tokens?.token || null
}

export const getRefreshToken = () => {
  const tokens = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? 'null')

  return tokens?.refreshToken || null
}
export const removeAccessToken = () => Cookies.remove(AUTH_TOKEN_KEY)
export const redirectToSignIn = (locale: string | undefined): void => {
  const baseURL = window.location.origin
  const signInURL = `${baseURL}/${locale}/auth/signin`
  window.location.href = signInURL
}

export const errorsFlatEntriesParser = (errors: { [key: string]: string | { [key: string]: string } }): [string, string][] => {
  const entries: [string, string][] = [];

  for (const [key, value] of Object.entries(errors)) {
    if (typeof value === 'string') {
      entries.push([key, value]);
    } else {
      const subEntries = errorsFlatEntriesParser(value);
      entries.push(...subEntries);
    }
  }

  return entries;
}


export const errorHandler = (error: any) => {
  if (error.message) {
    enqueueSnackbar(error.message, {
      variant: 'error',
      persist: true,
    })
  }
}

export const errorClientHandler = (error: any) => {
  const entries: [string, string][] = Object.entries(error)

  if (entries.length > 0) {
    for (let i = 0; i < 1; i += 1) {
      enqueueSnackbar(`${entries[i][0]}: ${entries[i][1]}`, {
        variant: 'error',
        persist: false,
      })
    }
  }
}
