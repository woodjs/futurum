import Cookies from 'js-cookie'

const AUTH_TOKEN_KEY = 'auth-token-data'

export const getAccessToken = () => {
  const tokens = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? 'null')
  console.log(tokens)
  return tokens.token
}

export const getRefreshToken = () => {
  const tokens = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? 'null')

  return tokens.refreshToken
}
export const removeAccessToken = () => Cookies.remove('AUTH_TOKEN_KEY')
export const redirectToSignIn = (locale: string | undefined): void => {
  const baseURL = window.location.origin
  const signInURL = `${baseURL}/${locale}/auth/signin`
  window.location.href = signInURL
}
