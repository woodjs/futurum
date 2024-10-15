'use client'
// import { organizationToForm } from '@/entities/organization/lib'
import {
  addressSchema,
  companyInfoSchema,
  contactInfoSchema,
  descriptionFormSchema,
  documentsFormSchema,
  employeesSchema,
  organizationToForm,
  OrganizationType,
  startPageSchema,
} from '@/entities/organization'
import { NormalButton } from '@/shared/ui/normal-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  AddressForm,
  CompanyInfoForm,
  ContactInfoForm,
  DescriptionForm,
  DocumentsForm,
  EmployeeForm,
  StartPageForm,
} from './forms'
import { useUpdateOrganization } from '@/entities/organization/api/hooks/use-update-organization'
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog'
import { useGetOrganizationById } from '@/entities/organization/api/hooks/use-get-organization-by-id'
import Loader from '@/shared/ui/loader'
import { Form } from '@/shared/ui/form'

// const organizationToForm = (
//   organization: IOrganization,
// ): IOrganizationFormData => {
//   switch (organization.type) {
//     case OrganizationType.STARTUP:
//       return {
//         type: OrganizationType.STARTUP,
//         address: {
//           address: organization.address,
//           city: organization.city,
//           country: organization.country,
//         },
//         company: {
//           companyName: organization.companyName,
//           ownershipForm: organization.ownershipForm,
//           position: organization.positionInCompany,
//         },
//         description: { description: organization.description },
//         files: {
//           logo: [organization.documents.logo],
//           additionalDocuments: organization.documents.additionalDocuments,
//           companyCard: organization.documents.companyCard && [
//             organization.documents.companyCard,
//           ],
//           financialIndicators: organization.documents.financialIndicators && [
//             organization.documents.financialIndicators,
//           ],
//           presentation: organization.documents.presentation && [
//             organization.documents.presentation,
//           ],
//           taxReturn: organization.documents.taxReturn && [
//             organization.documents.taxReturn,
//           ],
//         },
//         startPage: {
//           amountForStart: organization.fundingInfo.requiredFunding,
//           files: organization.fundingInfo.slideDeck?.map(slide => slide.file),
//         },
//         contact: {
//           ...organization.socialMedia,
//         },
//         employees: organization.employees && {
//           employees: organization.employees.map(employee => ({
//             firstName: employee.firstName,
//             lastName: employee.lastName,
//             phone: employee.phone,
//             telegram: employee.telegram,
//             link: employee.link,
//             futurumAccount: employee.futurumAccount,
//             avatar: employee.avatar && [
//               {
//                 type: employee.avatar.type,
//                 id: employee.avatar.id,
//                 name: employee.avatar.name,
//                 url: employee.avatar.url,
//               },
//             ],
//           })),
//         },
//       }
//     case OrganizationType.BUSINESS:
//       return {
//         type: OrganizationType.BUSINESS,
//         address: {
//           address: organization.address,
//           city: organization.city,
//           country: organization.country,
//         },
//         company: {
//           companyName: organization.companyName,
//           ownershipForm: organization.ownershipForm,
//           position: organization.positionInCompany,
//         },
//         description: { description: organization.description },
//         files: {
//           logo: [organization.documents.logo],
//           additionalDocuments: organization.documents.additionalDocuments,
//           companyCard: organization.documents.companyCard && [
//             organization.documents.companyCard,
//           ],
//           financialIndicators: organization.documents.financialIndicators && [
//             organization.documents.financialIndicators,
//           ],
//           presentation: organization.documents.presentation && [
//             organization.documents.presentation,
//           ],
//           taxReturn: organization.documents.taxReturn && [
//             organization.documents.taxReturn,
//           ],
//         },
//         financial: {
//           ...organization.financialInfo,
//         },
//         contact: {
//           ...organization.socialMedia,
//         },
//         employees: organization.employees && {
//           employees: organization.employees.map(employee => ({
//             firstName: employee.firstName,
//             lastName: employee.lastName,
//             phone: employee.phone,
//             telegram: employee.telegram,
//             link: employee.link,
//             futurumAccount: employee.futurumAccount,
//             avatar: employee.avatar && [
//               {
//                 type: employee.avatar.type,
//                 id: employee.avatar.id,
//                 name: employee.avatar.name,
//                 url: employee.avatar.url,
//               },
//             ],
//           })),
//         },
//       }
//     default:
//     case OrganizationType.CHARITY:
//       return {
//         type: OrganizationType.CHARITY,
//         address: {
//           address: organization.address,
//           city: organization.city,
//           country: organization.country,
//         },
//         company: {
//           companyName: organization.companyName,
//           ownershipForm: organization.ownershipForm,
//           position: organization.positionInCompany,
//         },
//         description: { description: organization.description },
//         files: {
//           logo: [organization.documents.logo],
//           additionalDocuments: organization.documents.additionalDocuments,
//           companyCard: organization.documents.companyCard && [
//             organization.documents.companyCard,
//           ],
//           financialIndicators: organization.documents.financialIndicators && [
//             organization.documents.financialIndicators,
//           ],
//           presentation: organization.documents.presentation && [
//             organization.documents.presentation,
//           ],
//           taxReturn: organization.documents.taxReturn && [
//             organization.documents.taxReturn,
//           ],
//         },
//         contact: {
//           ...organization.socialMedia,
//         },
//         employees: organization.employees && {
//           employees: organization.employees.map(employee => ({
//             firstName: employee.firstName,
//             lastName: employee.lastName,
//             phone: employee.phone,
//             telegram: employee.telegram,
//             link: employee.link,
//             futurumAccount: employee.futurumAccount,
//             avatar: employee.avatar && [
//               {
//                 type: employee.avatar.type,
//                 id: employee.avatar.id,
//                 name: employee.avatar.name,
//                 url: employee.avatar.url,
//               },
//             ],
//           })),
//         },
//       }
//   }
// }

interface IEditFromBaseProps {
  form: FC
  onSubmit: (data: any) => void
  isLoading?: boolean
  title: string
  description: string
  schema: z.AnyZodObject
  defaultValues?: any
}

const EditFromBase: FC<IEditFromBaseProps> = ({
  form: FormComponent,
  onSubmit,
  title,
  description,
  schema,
  defaultValues,
  isLoading,
}) => {
  const [open, setOpen] = useState(false)
  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  })
  const submitHandler = (data: any) => {
    setOpen(false)
    onSubmit(data)
  }

  useEffect(() => {
    if (open && defaultValues) form.reset(defaultValues)
  }, [open])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NormalButton size='sm' variant='ghost' onClick={() => setOpen(true)}>
          Редактировать
        </NormalButton>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] max-w-[600px] overflow-auto'>
        {isLoading && (
          <div
            className='absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center
              bg-black/10'
          >
            <Loader />
          </div>
        )}
        <Form {...form}>
          <div className='mb-4 flex items-center justify-between'>
            <div>
              <div className='text-2xl text-black'>{title}</div>
              <div className='text-slate-600'>{description}</div>
            </div>
          </div>
          <FormComponent />
          <div className='mt-8 flex justify-between'>
            <div className='ml-auto flex gap-4'>
              <NormalButton variant='ghost' onClick={() => setOpen(false)}>
                Отменить
              </NormalButton>
              <NormalButton
                onClick={form.handleSubmit(submitHandler)}
                disabled={!form.formState.isValid}
              >
                Сохранить
              </NormalButton>
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

interface IEditIdProps {
  id: string
}

const MainInfoForm = () => {
  return (
    <div>
      <CompanyInfoForm />
      <AddressForm />
    </div>
  )
}

export const EditMainInfoForm: FC<IEditIdProps> = ({ id }) => {
  const {
    data: organization,
    isLoading,
    isSuccess,
  } = useGetOrganizationById(id)

  const { mutate } = useUpdateOrganization()

  const data = useMemo(() => {
    if (isSuccess) {
      const data = organizationToForm(organization)
      return { ...data.company, ...data.address }
    }
    return {}
  }, [isSuccess, organization])

  if (isSuccess)
    return (
      <EditFromBase
        title='Основная информация'
        description='Укажите основную информацию организации'
        schema={companyInfoSchema.merge(addressSchema)}
        form={MainInfoForm}
        isLoading={isLoading}
        defaultValues={data}
        onSubmit={data =>
          mutate({
            id,
            organizationData: {
              company: {
                companyName: data.companyName,
                ownershipForm: data.ownershipForm,
                position: data.position,
              },
              address: {
                country: data.country,
                city: data.city,
                address: data.address,
              },
            },
          })
        }
      />
    )
}

export const EditContactInfoForm: FC<IEditIdProps> = ({ id }) => {
  const {
    data: organization,
    isLoading,
    isSuccess,
  } = useGetOrganizationById(id)

  const data = useMemo(() => {
    if (isSuccess) return organizationToForm(organization).contact
    return {}
  }, [isSuccess, organization])

  const { mutate } = useUpdateOrganization()

  if (isSuccess)
    return (
      <EditFromBase
        title='Контакты'
        description='Укажите контакты организации'
        schema={contactInfoSchema}
        form={ContactInfoForm}
        isLoading={isLoading}
        defaultValues={data}
        onSubmit={contact => mutate({ id, organizationData: { contact } })}
      />
    )
}

export const EditDocumentsForm: FC<IEditIdProps> = ({ id }) => {
  const {
    data: organization,
    isLoading,
    isSuccess,
  } = useGetOrganizationById(id)

  const { mutate } = useUpdateOrganization()

  const data = useMemo(() => {
    if (isSuccess) return organizationToForm(organization).files
    return {}
  }, [isSuccess, organization])

  if (isSuccess)
    return (
      <EditFromBase
        title='Документы'
        description='Укажите документы организации'
        schema={documentsFormSchema}
        form={DocumentsForm}
        isLoading={isLoading}
        defaultValues={data}
        onSubmit={files => mutate({ id, organizationData: { files } })}
      />
    )
}

export const EditEmployeesForm: FC<IEditIdProps> = ({ id }) => {
  const {
    data: organization,
    isLoading,
    isSuccess,
  } = useGetOrganizationById(id)

  const { mutate } = useUpdateOrganization()

  const data = useMemo(() => {
    if (isSuccess) return organizationToForm(organization).employees
    return {}
  }, [isSuccess, organization])

  if (isSuccess)
    return (
      <EditFromBase
        title='Сотрудники'
        description='Укажите сотрудников организации'
        schema={employeesSchema}
        form={EmployeeForm}
        isLoading={isLoading}
        defaultValues={data}
        onSubmit={employees => mutate({ id, organizationData: { employees } })}
      />
    )
}

export const EditFinancialForm: FC<IEditIdProps> = ({ id }) => {
  const {
    data: organization,
    isLoading,
    isSuccess,
  } = useGetOrganizationById(id)

  const { mutate } = useUpdateOrganization()

  const data = useMemo(() => {
    if (isSuccess && organization.type === OrganizationType.BUSINESS) {
      const data = organizationToForm(organization)
      if (data.type === OrganizationType.BUSINESS) return data.financial
    }
    return {}
  }, [isSuccess, organization])

  if (isSuccess)
    return (
      <EditFromBase
        title='Финансы'
        description='Укажите финансы организации'
        schema={employeesSchema}
        form={EmployeeForm}
        isLoading={isLoading}
        defaultValues={data}
        onSubmit={financial => mutate({ id, organizationData: { financial } })}
      />
    )
}

export const EditStartPageForm: FC<IEditIdProps> = ({ id }) => {
  const {
    data: organization,
    isLoading,
    isSuccess,
  } = useGetOrganizationById(id)

  const { mutate } = useUpdateOrganization()

  const data = useMemo(() => {
    if (isSuccess) {
      const data = organizationToForm(organization)
      if (data.type === OrganizationType.STARTUP) return data.startPage
    }
    return {}
  }, [isSuccess, organization])

  if (isSuccess)
    return (
      <EditFromBase
        title='Стартовая страница'
        description='Укажите информацию о стартовой странице организации'
        schema={startPageSchema}
        form={StartPageForm}
        isLoading={isLoading}
        defaultValues={data}
        onSubmit={startPage => mutate({ id, organizationData: { startPage } })}
      />
    )
}

export const EditDescriptionForm: FC<IEditIdProps> = ({ id }) => {
  const {
    data: organization,
    isLoading,
    isSuccess,
  } = useGetOrganizationById(id)

  const data = useMemo(() => {
    if (isSuccess) return organizationToForm(organization).description
    return {}
  }, [isSuccess, organization])

  const { mutate } = useUpdateOrganization()

  if (isSuccess)
    return (
      <EditFromBase
        title='Описание'
        description='Укажите описание организации'
        schema={descriptionFormSchema}
        form={DescriptionForm}
        isLoading={isLoading}
        defaultValues={data}
        onSubmit={description =>
          mutate({ id, organizationData: { description } })
        }
      />
    )
}
