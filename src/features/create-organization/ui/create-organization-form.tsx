'use client'
import { useForm } from 'react-hook-form'
import { steps, useStepper } from '../model'
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
import { useTranslations } from 'next-intl'

export const CreateOrganizationForm = () => {
  const stepper = useStepper()
  const t = useTranslations()

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(stepper.current.schema),
  })

  const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
    // biome-ignore lint/suspicious/noConsoleLog: <We want to log the form values>
    console.log(`Form values for step ${stepper.current.id}:`, values)
    if (stepper.isLast) {
      stepper.reset()
    } else {
      stepper.next()
    }
  }

  return (
    <Form {...form}>
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
      {stepper.switch({
        company: () => <CompanyInfo />,
        address: () => <Address />,
        description: () => <Description />,
        contact: () => <ContactInfo />,
        files: () => <DocumentsForm />,
      })}
      <div className='mt-8 flex justify-between'>
        <NormalButton variant='ghost' onClick={() => stepper.prev()}>
          {t('buttons.back')}
        </NormalButton>
        {stepper.current.skip && (
          <NormalButton
            className='ml-auto'
            variant='ghost'
            onClick={() => stepper.next()}
          >
            {t('buttons.skip')}
          </NormalButton>
        )}
        <NormalButton
          onClick={form.handleSubmit(onSubmit)}
          disabled={!form.formState.isValid}
        >
          {stepper.isLast ? t('buttons.submit') : t('buttons.next')}
        </NormalButton>
      </div>
    </Form>
  )
}
