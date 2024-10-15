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

export const CreateOrganizationForm = () => {
  const stepper = useStepper()

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
          <div className='text-2xl text-black'>Создание компании</div>
          <div className='text-slate-600'>{stepper.current.description}</div>
        </div>
        <div className='text-slate-500'>
          Шаг {stepper.current.index + 1} из {steps.length}
        </div>
      </div>
      {/* <form onSubmit={form.handleSubmit(onSubmit)}> */}
      {stepper.switch({
        company: () => <CompanyInfo />,
        address: () => <Address />,
        description: () => <Description />,
        contact: () => <ContactInfo />,
        files: () => <DocumentsForm />,
      })}
      <div className='mt-8 flex justify-between'>
        <NormalButton variant='ghost' onClick={() => stepper.prev()}>
          Назад
        </NormalButton>
        {stepper.current.skip && (
          <NormalButton
            className='ml-auto'
            variant='ghost'
            onClick={() => stepper.next()}
          >
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
      {/* </form> */}
    </Form>
  )
}
