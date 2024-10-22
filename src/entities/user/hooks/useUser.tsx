'use client'
// import { useEffect, useState } from 'react'
import { AUTH_ME_URL } from '../../../shared/api/config'
import { protectedAPI } from '../../../shared/api'
// import { useUserStore } from '../model'
import { useQuery } from '@tanstack/react-query'
import { SnackbarProvider, useSnackbar } from 'notistack'

const fetchUserData = () => {
  return protectedAPI
    .get(AUTH_ME_URL)
    .then(res => res.data)
    .catch(error => {
      console.log(error)
    })
}

export const useUser = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserData,
  })

  if (isError) {
    enqueueSnackbar(error.message)
  }

  return { user: data, isLoading: isPending }
}
