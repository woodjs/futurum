import Cookies from 'js-cookie'

export const getAccessToken = () => Cookies.get('accessToken')
export const removeAccessToken = () => Cookies.remove('accessToken')
