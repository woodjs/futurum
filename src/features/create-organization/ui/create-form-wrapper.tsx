'use client'

import { useForm } from 'react-hook-form'
import {
  FailedOrganizationView,
  IOrganization,
  IOrganizationFormData,
  IOrganizationStep,
  OrganizationType,
} from '@/entities/organization'
import { useCreateOrganization} from '@/entities/organization/api/'
import { z } from 'zod'
import CompanyInfo from './company-info'
import Address from './address'
import { NormalButton } from '@/shared/ui/normal-button'
import Description from './description'
import ContactInfo from './contact-info'
import DocumentsForm from './documents-form'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { FC, useEffect, useState } from 'react'
import FinancialInfoForm from './financial-info-form'
import { Stepper } from '@stepperize/react'
import StartPageForm from './start-page-form'
import EmployeeForm from './employee-form'
import Loader from '@/shared/ui/loader'
import { useTranslations } from 'next-intl'
import { errorsFlatEntriesParser } from '@/shared/api/helpers/auth.helper'
import { enqueueSnackbar } from 'notistack'

// Импортируем ваш компонент формы
import { Form } from '@/shared/ui/form'

interface ICreateBusinessFormProps {
  onSuccess: (organization: IOrganization) => void
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
  const t = useTranslations()

  const [data, setData] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const { mutateAsync: mutate } = useCreateOrganization()

  // Пользовательский resolver для текущего шага
  const resolver = async (values: any) => {
    const schema = stepper.current.schema
    try {
      const validatedData = await schema.parseAsync(values)
      return { values: validatedData, errors: {} }
    } catch (e) {
      if (e instanceof z.ZodError) {
        // Преобразуем ошибки в формат, ожидаемый react-hook-form
        const errors = e.errors.reduce((acc: any, currError) => {
          const path = currError.path.join('.')
          acc[path] = {
            type: currError.code,
            message: currError.message,
          }
          return acc
        }, {})
        return { values: {}, errors }
      }
      return { values: {}, errors: {} }
    }
  }

  // Инициализируем useForm с defaultValues для текущего шага
  const form = useForm({
    mode: 'onTouched', // или 'onChange', если предпочитаете
    resolver,
    defaultValues: data[stepper.current.id] || {},
    shouldUnregister: false,
  })

  useEffect(() => {
    // Сбрасываем форму и загружаем данные текущего шага при смене шага
    form.reset(data[stepper.current.id] || {}, { keepErrors: true })
    // Не вызываем form.trigger(), чтобы избежать запуска валидации при смене шага
  }, [stepper.current.id])

  const onSubmit = async (values: any) => {
    // Сохраняем данные текущего шага под ключом stepper.current.id
    const newData = { ...data, [stepper.current.id]: values }
    setData(newData)

    if (stepper.isLast) {
      setIsLoading(true)
      try {
        // Объединяем данные всех шагов для отправки на сервер
        const mergedData = Object.values(newData).reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          {},
        )

        const response = await mutate({
          ...newData,
          type,
        } as IOrganizationFormData)
        if (onSuccess) onSuccess(response)
      } catch (e: any) {
        if (e.errors) {
          const firstKey = Object.keys(e.errors)[0]
          if (firstKey) {
            stepper.goTo(firstKey)
          }
          // Устанавливаем ошибки с корректными именами полей
          errorsFlatEntriesParser(e.errors).forEach(([key, value]) => {
            enqueueSnackbar(value, { variant: 'error' })
            form.setError(key as any, {
              type: 'server',
              message: value,
            })
          })
        } else {
          setIsError(true)
        }
      } finally {
        setIsLoading(false)
      }
    } else {
      stepper.next()
    }
  }

  const clearSkippedData = (key: keyof typeof data) => {
    const newData = { ...data }
    delete newData[key]
    setData(newData)
  }

  if (isError) return <FailedOrganizationView back={() => setIsError(false)} />

  return (
    <Form {...form}>
      <button
        type='button'
        className='mb-4 flex items-center text-slate-600'
        onClick={() => {
          if (onBack) onBack()
          stepper.reset()
        }}
      >
        <ChevronLeftIcon className='size-5' />{' '}
        {t('organization.buttons.toTypeSelection')}
      </button>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <div className='text-2xl text-black'>
            {t('organization.form.stepper.mainStepper.createOrganization')}
          </div>
          <div className='text-slate-600'>{t(stepper.current.description)}</div>
        </div>
        <div className='text-slate-500'>
          {t('organization.form.stepper.mainStepper.stepInfo', {
            currentStep: stepper.current.index + 1,
            totalSteps: steps.length,
          })}
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
            type='button'
            variant='ghost'
            onClick={() => {
              stepper.prev()
            }}
          >
            {t('organization.buttons.back')}
          </NormalButton>
        )}
        <div className='ml-auto flex gap-4'>
          {stepper.current.skip && (
            <NormalButton
              type='button'
              variant='ghost'
              onClick={() => {
                clearSkippedData(stepper.current.id)
                stepper.next()
              }}
            >
              {t('organization.buttons.skip')}
            </NormalButton>
          )}
          <NormalButton
            type='button'
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading || !form.formState.isValid}
          >
            {stepper.isLast
              ? t('organization.buttons.submit')
              : t('organization.buttons.next')}
          </NormalButton>
        </div>
      </div>
    </Form>
  )
}
