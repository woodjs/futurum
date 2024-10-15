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

type FinancialInfoValues = z.infer<typeof financialInfoSchema>

const FinancialInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FinancialInfoValues>()
  return (
    <div className='grid gap-4'>
      <FormField
        control={control}
        name='foundationYear'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Год основания</FormLabel>
            <FormControl>
              <FormInput
                type='number'
                placeholder='Введите год...'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='annualTurnover'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Годовой оборот</FormLabel>
            <FormControl>
              <FormInput placeholder='Введите оборот...' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='grossRevenue'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Месячная выручка</FormLabel>
            <FormControl>
              <FormInput placeholder='Введите выручку...' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default FinancialInfoForm
