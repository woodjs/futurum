import { useMutation } from '@tanstack/react-query'
import { ICollectBaseData, ICollectCreate } from '../../model'
import { createCollect } from '../services'


export const useCreateCollection = (data:ICollectCreate) =>
  useMutation({
    mutationFn: (data: ICollectCreate) => {
      return createCollect(data)
    },
    onSuccess: data => {},
  })
