import { useMutation } from '@tanstack/react-query'
import { createCollection } from '../services'
import { CollectionsSchemaType } from '../../model/form-types'

export const useCreateCollection = () =>
  useMutation({
    mutationFn: (data: CollectionsSchemaType) => {
      return createCollection(data)
    },
    onSuccess: data => {},
  })
