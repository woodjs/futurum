'use client'
import { AUTH_ME_URL } from '../../../shared/api/config'
import { protectedAPI } from '../../../shared/api'
import { useQuery } from '@tanstack/react-query'
import { errorClientHandler } from '../../../shared/api/helpers/auth.helper'
import { userKeysEnum } from '../model'

const fetchUserData = () => {
  return protectedAPI
    .get(AUTH_ME_URL)
    .then(res => res.data)
    .catch(error => {
      errorClientHandler(error?.errors)
    })
}

export const useUser = () => {
  const { isPending, data } = useQuery({
    queryKey: [userKeysEnum.USER_GET_KEY],
    queryFn: fetchUserData,
  })

  return { user: data, isLoading: isPending }
}
