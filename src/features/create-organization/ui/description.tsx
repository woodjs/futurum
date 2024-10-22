'use client'
import { useFormContext } from 'react-hook-form'
import { descriptionFormSchema } from '@/entities/organization'
import { z } from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import Editor from '@/shared/ui/editor'
import { useTranslations } from 'next-intl'

type DescriptionValues = z.infer<typeof descriptionFormSchema>

const Description = () => {
  const { control } = useFormContext<DescriptionValues>()
  const t = useTranslations()

  return (
    <div className='grid gap-4'>
      <FormField
        control={control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('organization.form.description.label')}</FormLabel>
            <FormControl>
              <Editor
                className='min-h-[300px]'
                placeholder={t('organization.form.description.placeholder')}
                content={field.value || ''}
                onContentChange={field.onChange}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />
    </div>
  )
}

export default Description
