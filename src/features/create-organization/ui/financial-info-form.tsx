'use client'
import { useFormContext } from 'react-hook-form'
import { financialInfoSchema } from '@/entities/organization'
import { z } from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { FormInput } from '@/shared/ui/form-input'
import { useTranslations } from 'next-intl'

type FinancialInfoValues = z.infer<typeof financialInfoSchema>

const FinancialInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FinancialInfoValues>()
  const t = useTranslations()

  return (
    <div className='grid gap-4'>
      <FormField
        control={control}
        name='foundationYear'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t(
                'organization.form.startPage.financialInfo.foundationYear.label',
              )}
            </FormLabel>
            <FormControl>
              <FormInput
                type='number'
                placeholder={t(
                  'organization.form.startPage.financialInfo.foundationYear.placeholder',
                )}
                {...field}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='annualTurnover'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t(
                'organization.form.startPage.financialInfo.annualTurnover.label',
              )}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.startPage.financialInfo.annualTurnover.placeholder',
                )}
                {...field}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='grossRevenue'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t(
                'organization.form.startPage.financialInfo.grossRevenue.label',
              )}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.startPage.financialInfo.grossRevenue.placeholder',
                )}
                {...field}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
    </div>
  )
}

export default FinancialInfoForm
