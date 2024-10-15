'use client'

export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const AUTH_REFRESH_URL = '/v1/auth/refresh'
export const AUTH_ME_URL = API_URL + '/v1/auth/me'
// export const AUTH_LOGOUT_URL = API_URL + '/v1/auth/logout'
export const AUTH_LOGOUT_URL = '/v1/auth/logout'
export const AUTH_SIGN_UP = '/v1/auth/email/register'
export const AUTH_SIGN_IN = '/v1/auth/email/login'
