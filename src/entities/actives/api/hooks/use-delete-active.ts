import { useMutation } from '@tanstack/react-query'
import { DeleteActive } from '../services'
import { FC } from 'react'

type DeleteActiveVariables = {
    uuid: string
  }

export const useDeleteActive: FC<DeleteActiveVariables> = ({uuid}) => {
  return DeleteActive(uuid)
}
