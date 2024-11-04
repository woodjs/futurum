import { useMutation } from '@tanstack/react-query'
import { IActiveBaseData } from '../../model'
import { createActive } from '../services'


export const useCreateActive = () =>
  useMutation({
    mutationFn: (data: IActiveBaseData) => {
      return createActive(data)
    },
    onSuccess: data => {},
  })
