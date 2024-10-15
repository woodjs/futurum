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

type AddressValues = z.infer<typeof addressSchema>

const Address = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddressValues>()
  return (
    <div className='grid gap-4'>
      <FormField
        control={control}
        name='country'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Страна</FormLabel>
            <FormControl>
              <FormInput placeholder='Введите страну...' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='city'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Город</FormLabel>
            <FormControl>
              <FormInput placeholder='Введите город...' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='address'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Адрес</FormLabel>
            <FormControl>
              <FormInput placeholder='Введите адрес...' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default Address
