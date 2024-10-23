'use client'

export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const AUTH_REFRESH_URL = API_URL + '/v1/auth/refresh'
export const AUTH_ME_URL = API_URL + '/v1/auth/me'
// export const AUTH_LOGOUT_URL = API_URL + '/v1/auth/logout'
export const AUTH_LOGOUT_URL = API_URL + '/v1/auth/logout'
export const AUTH_SIGN_UP = API_URL + '/v1/auth/email/register'
export const AUTH_SIGN_IN = API_URL + '/v1/auth/email/login'
export const AUTH_PASSWORD_CHANGE = API_URL + '/v1/users/{id}/change-password'
export const AUTH_PROFILE = API_URL + '/v1/profile'
