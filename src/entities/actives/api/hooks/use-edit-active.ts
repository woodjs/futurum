import { useMutation } from '@tanstack/react-query'
import { EditActive } from '../services'
import { ActiveSchema2 } from '../../model/form-types'

type EditActiveVariables = {
    data: ActiveSchema2
    uuid: string
  }

export const useEditActive = () =>
  useMutation({
    mutationFn: ({ data, uuid }: EditActiveVariables) => {
      return EditActive(data, uuid)
    },
    onSuccess: data => {},
  })
