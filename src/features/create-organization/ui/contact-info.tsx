'use client'
import { useFormContext } from 'react-hook-form'
import { contactInfoSchema } from '@/entities/organization'
import { z } from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { FormInput } from '@/shared/ui/form-input'

type ContactInfoValues = z.infer<typeof contactInfoSchema>

const ContactInfo = () => {
  const { control } = useFormContext<ContactInfoValues>()
  return (
    <div className='grid gap-4'>
      <FormField
        control={control}
        name='phone'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Номер телефона</FormLabel>
            <FormControl>
              <FormInput
                placeholder='Введите номер...'
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='facebook'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Facebook</FormLabel>
            <FormControl>
              <FormInput
                placeholder='Введите ссылку...'
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='instagram'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instagram</FormLabel>
            <FormControl>
              <FormInput
                placeholder='Введите ссылку...'
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='reddit'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reddit</FormLabel>
            <FormControl>
              <FormInput
                placeholder='Введите ссылку...'
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='telegram'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telegram</FormLabel>
            <FormControl>
              <FormInput
                placeholder='Введите ссылку...'
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='twitter'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Twitter</FormLabel>
            <FormControl>
              <FormInput
                placeholder='Введите ссылку...'
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='vk'
        render={({ field }) => (
          <FormItem>
            <FormLabel>VK</FormLabel>
            <FormControl>
              <FormInput
                placeholder='Введите ссылку...'
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='weChat'
        render={({ field }) => (
          <FormItem>
            <FormLabel>WeChat</FormLabel>
            <FormControl>
              <FormInput
                placeholder='Введите ссылку...'
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='whatsapp'
        render={({ field }) => (
          <FormItem>
            <FormLabel>WhatsApp</FormLabel>
            <FormControl>
              <FormInput
                placeholder='Введите ссылку...'
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default ContactInfo
