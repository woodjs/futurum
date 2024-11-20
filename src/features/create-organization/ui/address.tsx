'use client'
import { useFormContext } from 'react-hook-form'
import { addressSchema } from '@/entities/organization'
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

type AddressValues = z.infer<typeof addressSchema>

const Address = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddressValues>()
  const t = useTranslations()

  return (
    <div className='grid gap-4'>
      <FormField
        control={control}
        name='country'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.address.country.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t('organization.form.address.country.placeholder')}
                {...field}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='city'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('organization.form.address.city.label')}</FormLabel>
            <FormControl>
              <FormInput
                placeholder={t('organization.form.address.city.placeholder')}
                {...field}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='address'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.address.address.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t('organization.form.address.address.placeholder')}
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

export default Address
