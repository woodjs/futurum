import Cookies from 'js-cookie'

export const getAccessToken = () => Cookies.get('accessToken')
export const removeAccessToken = () => Cookies.remove('accessToken')
export const redirectToSignIn = (locale: string | undefined): void => {
  const baseURL = window.location.origin
  const signInURL = `${baseURL}/${locale}/auth/signin`
  window.location.href = signInURL
}
