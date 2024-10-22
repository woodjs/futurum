'use client'
import { OrganizationView } from '@/entities/organization'
import { useGetOrganizationById } from '@/entities/organization/api/hooks/use-get-organization-by-id'
import {
  EditContactInfoForm,
  EditDescriptionForm,
  EditDocumentsForm,
  EditEmployeesForm,
  EditFinancialForm,
  EditMainInfoForm,
  EditStartPageForm,
} from '@/features/create-organization'
import { Skeleton } from '@/shared/ui/skeleton'

export const MyOrganization = ({ id }: { id: string }) => {
  const { data, isLoading, isSuccess, isError } = useGetOrganizationById(id)
  if (isLoading)
    return (
      <div className='w-full space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-black'>
        <Skeleton className='h-[300px] w-full rounded-md' />
        <div className='w-1/2 space-y-2'>
          <Skeleton className='h-5 w-1/3 rounded-full' />
          <Skeleton className='h-3 w-2/3 rounded-full' />
          <Skeleton className='h-3 w-5/6 rounded-full' />
        </div>
        <div className='space-y-4'>
          <Skeleton className='h-5 w-2/12 rounded-full' />
          <div className='w-[64ch] max-w-prose space-y-2'>
            <Skeleton className='h-3 w-full max-w-prose rounded-full' />
            <Skeleton className='h-3 w-full max-w-prose rounded-full' />
            <Skeleton className='h-3 w-full max-w-prose rounded-full' />
            <Skeleton className='h-3 w-full max-w-prose rounded-full' />
            <Skeleton className='h-3 w-3/12 max-w-prose rounded-full' />
          </div>
        </div>
      </div>
    )
  if (isError) return <div>Ошибка загрузки</div>
  if (isSuccess)
    return (
      <OrganizationView
        documentsEdit={EditDocumentsForm}
        employeesEdit={EditEmployeesForm}
        financialInfoEdit={EditFinancialForm}
        startPageEdit={EditStartPageForm}
        mainInfoEdit={EditMainInfoForm}
        descriptionEdit={EditDescriptionForm}
        socialMediaEdit={EditContactInfoForm}
        organization={data}
      />
    )
}
