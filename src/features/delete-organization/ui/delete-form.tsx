import { useDeleteOrganization } from '@/entities/organization/api/hooks/use-delete-organization'
import { useUser } from '@/entities/user'
import { useRouter } from '@/i18n/routing'
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog'
import Loader from '@/shared/ui/loader'
import { NormalButton } from '@/shared/ui/normal-button'
import { DialogClose } from '@radix-ui/react-dialog'
import { is } from 'date-fns/locale'
import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

interface IDeleteOrganizationForm {
  id: string
}

const DeleteOrganization: FC<IDeleteOrganizationForm> = ({ id }) => {
  const t = useTranslations()
  const { mutate } = useDeleteOrganization()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const deleteHandler = () => {
    setIsLoading(true)
    mutate(id, {
      onSuccess: () => router.push('/profile/organizations'),
      onError: () => setIsLoading(false),
      onSettled: () => setIsLoading(false),
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <NormalButton
          variant='ghost'
          className='w-full text-red-500 hover:bg-red-50 hover:text-red-600 active:bg-red-100'
        >
          {t('organization.delete.button')}
        </NormalButton>
      </DialogTrigger>

      <DialogContent>
        {isLoading && (
          <div
            className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center
              rounded-xl bg-white/50'
          >
            <Loader />
          </div>
        )}
        <div className='text-2xl font-bold text-black'>
          {t('organization.delete.title')}
        </div>
        <div className='ml-auto flex gap-2'>
          <DialogClose asChild>
            <NormalButton variant='outline'>
              {t('organization.delete.cancel')}
            </NormalButton>
          </DialogClose>
          <NormalButton
            disabled={isLoading}
            onClick={deleteHandler}
            variant='destructive'
          >
            {t('organization.delete.button')}
          </NormalButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteOrganization
