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

type CompanyInfoValues = z.infer<typeof companyInfoSchema>

const CompanyInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CompanyInfoValues>()
  return (
    <div className='grid gap-4'>
      <FormField
        control={control}
        name='companyName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Название компании</FormLabel>
            <FormControl>
              <FormInput placeholder='Введите название...' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='position'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ваша должность в компании</FormLabel>
            <FormControl>
              <FormInput placeholder='Введите вашу должность...' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='ownershipForm'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Форма собственности</FormLabel>
            <FormControl>
              <FormInput
                placeholder='Введите форму собственности...'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default CompanyInfo
