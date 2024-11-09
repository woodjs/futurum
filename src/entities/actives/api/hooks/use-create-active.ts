import { useMutation } from '@tanstack/react-query'
import { createActive } from '../services'
import { ActiveSchema } from '../../model/form-types'

export const useCreateActive = () =>
  useMutation({
    mutationFn: (data: ActiveSchema) => {
      return createActive(data)
    },
    onSuccess: data => {},
  })
