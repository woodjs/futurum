'use client'
import { useFormContext } from 'react-hook-form'
import { companyInfoSchema } from '@/entities/organization'
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

type CompanyInfoValues = z.infer<typeof companyInfoSchema>

const CompanyInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CompanyInfoValues>()
  const t = useTranslations()

  return (
    <div className='grid gap-4'>
      <FormField
        control={control}
        name='companyName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.companyInfo.companyName.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.companyInfo.companyName.placeholder',
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
        name='position'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.companyInfo.position.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.companyInfo.position.placeholder',
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
        name='ownershipForm'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.companyInfo.ownershipForm.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.companyInfo.ownershipForm.placeholder',
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

export default CompanyInfo
