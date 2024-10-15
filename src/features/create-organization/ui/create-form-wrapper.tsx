'use client'
import { useForm } from 'react-hook-form'
import {
  businessStepper,
  IOrganizationFormData,
  IOrganizationStep,
  OrganizationType,
  useCreateOrganization,
} from '@/entities/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/shared/ui/form'
import CompanyInfo from './company-info'
import Address from './address'
import { Button } from '@/shared/ui'
import Description from './description'
import { NormalButton } from '@/shared/ui/normal-button'
import ContactInfo from './contact-info'
import DocumentsForm from './documents-form'
import { useRouter } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { FC, useState } from 'react'
import FinancialInfoForm from './financial-info-form'
import { Stepper } from '@stepperize/react'
import StartPageForm from './start-page-form'
import EmployeeForm from './employee-form'
import Loader from '@/shared/ui/loader'

interface ICreateBusinessFormProps {
  onSuccess: () => void
  onBack: () => void
  onReject?: () => void
  stepper: Stepper<IOrganizationStep[]>
  steps: IOrganizationStep[]
  type: OrganizationType
}

export const CreateFormWrapper: FC<ICreateBusinessFormProps> = ({
  onSuccess,
  onBack,
  onReject,
  stepper,
  steps,
  type,
}) => {
  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(stepper.current.schema),
  })
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { mutateAsync: mutate } = useCreateOrganization()

  const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
    setData({ ...data, [stepper.current.id]: values, type })
    if (stepper.isLast) {
      setIsLoading(true)
      mutate(data as IOrganizationFormData)
        .then(() => {
          if (onSuccess) onSuccess()
        })
        .catch(e => {
          if (onReject) onReject()
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      stepper.next()
    }
  }

  return (
    <Form {...form}>
      <button
        className='mb-4 flex items-center text-slate-600'
        onClick={() => {
          if (onBack) onBack()
          stepper.reset()
        }}
      >
        <ChevronLeftIcon className='size-5' /> К выбору типа организации
      </button>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <div className='text-2xl text-black'>Создание компании</div>
          <div className='text-slate-600'>{stepper.current.description}</div>
        </div>
        <div className='text-slate-500'>
          Шаг {stepper.current.index + 1} из {steps.length}
        </div>
      </div>
      {isLoading && (
        <div className='absolute flex h-full w-full items-center justify-center'>
          <Loader />
        </div>
      )}
      {stepper.switch({
        company: () => <CompanyInfo />,
        address: () => <Address />,
        financial: () => <FinancialInfoForm />,
        description: () => <Description />,
        contact: () => <ContactInfo />,
        files: () => <DocumentsForm />,
        startPage: () => <StartPageForm />,
        employees: () => <EmployeeForm />,
      })}
      <div className='mt-8 flex justify-between'>
        {!stepper.isFirst && (
          <NormalButton
            variant='ghost'
            onClick={() => {
              stepper.prev()
            }}
          >
            Назад
          </NormalButton>
        )}
        <div className='ml-auto flex gap-4'>
          {stepper.current.skip && (
            <NormalButton variant='ghost' onClick={() => stepper.next()}>
              Пропустить
            </NormalButton>
          )}
          <NormalButton
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid || isLoading}
          >
            {stepper.isLast ? 'Submit' : 'Next'}
          </NormalButton>
        </div>
      </div>
    </Form>
  )
}
