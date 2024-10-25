'use client'
import { AUTH_PROFILE } from '../../../shared/api/config'
import { protectedAPI } from '../../../shared/api'
import { useQuery } from '@tanstack/react-query'
import { profileKeysEnum } from '../model'
import { errorClientHandler } from '../../../shared/api/helpers/auth.helper'

const fetchUserData = () => {
  return protectedAPI
    .get(AUTH_PROFILE)
    .then(res => res.data)
    .catch(error => {
      errorClientHandler(error?.errors)
    })
}

export const useProfile = () => {
  const { isPending, data } = useQuery({
    queryKey: [profileKeysEnum.PROFILE_GET_KEY],
    queryFn: fetchUserData,
  })

  return { user: data, isLoading: isPending }
}
