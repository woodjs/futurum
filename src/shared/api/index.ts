import axios from 'axios'
import storeTokens from '@/utils/storeTokens'
import { redirect } from '@/i18n/routing'
import { API_URL } from './config'

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.SERVER_URL,
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

  return config
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

instance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config

    if (
      (error.response.status === 401 ||
        error.response.status === 419 ||
        error.response.status === 406 ||
        error.response.status === 400) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })

          if (
            originalRequest.url === '/auth/refresh-token' &&
            (error.response.status === 401 ||
              error.response.status === 419 ||
              error.response.status === 406 ||
              error.response.status === 400)
          ) {
            redirect('signIn')
          }
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return instance(originalRequest)
          })
          .catch(err => {
            redirect('signIn')
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = window.localStorage.getItem('refreshToken')
      return new Promise((resolve, reject) => {
        instance
          .post(`${API_URL}/api/v1/auth/refresh`, { refreshToken }) // route must be changed to the actual one, this one is dummy url
          .then(({ data }) => {
            storeTokens(data.accessToken, data.refreshToken)
            instance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
            processQueue(null, data.accessToken)
            resolve(instance(originalRequest))
          })
          .catch(err => {
            processQueue(err, null)
            reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }

    return Promise.reject(error)
  },
)

export default instance
