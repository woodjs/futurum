'use client'
// import { useEffect, useState } from 'react'
import { AUTH_PROFILE } from '../../../shared/api/config'
import { protectedAPI } from '../../../shared/api'
// import { useUserStore } from '../model'
import { useQuery } from '@tanstack/react-query'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { profileKeysEnum } from '../model'

const fetchUserData = () => {
  return protectedAPI
    .get(AUTH_PROFILE)
    .then(res => res.data)
    .catch(error => {
      console.log(error)
    })
}

export const useProfile = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { isPending, isError, data, error } = useQuery({
    queryKey: [profileKeysEnum.PROFILE_GET_KEY],
    queryFn: fetchUserData,
  })

  if (isError) {
    enqueueSnackbar(error.message)
  }

  return { user: data, isLoading: isPending }
}
