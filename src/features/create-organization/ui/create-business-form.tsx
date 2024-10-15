'use client'
import { useForm } from 'react-hook-form'
import { businessStepper } from '@/entities/organization'
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
import { FC } from 'react'
import FinancialInfoForm from './financial-info-form'

const { steps, useStepper } = businessStepper

interface ICreateBusinessFormProps {
  onSuccess: () => void
  onBack: () => void
}

export const CreateBusinessForm: FC<ICreateBusinessFormProps> = ({
  onSuccess,
  onBack,
}) => {
  const router = useRouter()
  const stepper = useStepper()

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(stepper.current.schema),
  })

  const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
    // biome-ignore lint/suspicious/noConsoleLog: <We want to log the form values>
    console.log(`Form values for step ${stepper.current.id}:`, values)
    if (stepper.isLast) {
      if (onSuccess) onSuccess()
      // stepper.reset()
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
      {stepper.switch({
        company: () => <CompanyInfo />,
        address: () => <Address />,
        financial: () => <FinancialInfoForm />,
        description: () => <Description />,
        contact: () => <ContactInfo />,
        files: () => <DocumentsForm />,
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
            disabled={!form.formState.isValid}
          >
            {stepper.isLast ? 'Submit' : 'Next'}
          </NormalButton>
        </div>
      </div>
    </Form>
  )
}
