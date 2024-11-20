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
import { useTranslations } from 'next-intl'

type ContactInfoValues = z.infer<typeof contactInfoSchema>

const ContactInfo = () => {
  const { control } = useFormContext<ContactInfoValues>()
  const t = useTranslations()

  return (
    <div className='grid gap-4'>
      <FormField
        control={control}
        name='phone'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.contactInfo.phone.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.contactInfo.phone.placeholder',
                )}
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='facebook'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.contactInfo.facebook.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.contactInfo.facebook.placeholder',
                )}
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='instagram'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.contactInfo.instagram.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.contactInfo.instagram.placeholder',
                )}
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='reddit'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.contactInfo.reddit.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.contactInfo.reddit.placeholder',
                )}
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='telegram'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.contactInfo.telegram.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.contactInfo.telegram.placeholder',
                )}
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='twitter'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.contactInfo.twitter.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.contactInfo.twitter.placeholder',
                )}
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='vk'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('organization.form.contactInfo.vk.label')}</FormLabel>
            <FormControl>
              <FormInput
                placeholder={t('organization.form.contactInfo.vk.placeholder')}
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='weChat'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.contactInfo.weChat.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.contactInfo.weChat.placeholder',
                )}
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='whatsapp'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.contactInfo.whatsapp.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                placeholder={t(
                  'organization.form.contactInfo.whatsapp.placeholder',
                )}
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
    </div>
  )
}

export default ContactInfo
