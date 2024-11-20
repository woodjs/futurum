import { useMutation } from '@tanstack/react-query'
import { createActive } from '../services'
import { ActiveSchema, ActiveSchema2 } from '../../model/form-types'

export const useCreateActive = () =>
  useMutation({
    mutationFn: (data: ActiveSchema2) => {
      return createActive(data)
    },
    onSuccess: data => {},
  })
