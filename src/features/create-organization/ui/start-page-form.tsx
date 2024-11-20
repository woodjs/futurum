'use client'
import { z } from 'zod'
import { startPageSchema } from '@/entities/organization'
import { Controller, useFormContext } from 'react-hook-form'
import FileUpload from '@/shared/ui/file-upload'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { FormInput } from '@/shared/ui/form-input'
import { useTranslations } from 'next-intl'

type StartPageValues = z.infer<typeof startPageSchema>
const StartPageForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<StartPageValues>()
  const t = useTranslations()

  return (
    <div className='grid gap-4'>
      {/* Поле для ввода суммы для старта */}
      <Controller
        name='amountForStart'
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('organization.form.startPage.amountForStart.label')}
            </FormLabel>
            <FormControl>
              <FormInput
                type='number'
                placeholder={t(
                  'organization.form.startPage.amountForStart.placeholder',
                )}
                {...field}
                onChange={e => {
                  field.onChange(e.target.valueAsNumber)
                }}
              />
            </FormControl>
            <FormMessage useTranslate />
          </FormItem>
        )}
      />

      {/* Поле для загрузки файлов */}
      <Controller
        name='files'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='files'
            label={t('organization.form.startPage.files.label')}
            accept={'image/png, image/jpeg, image/jpg, image/webp'}
            multiple={true}
            maxFiles={10}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={t(errors.files?.message as string)}
          />
        )}
      />
    </div>
  )
}

export default StartPageForm
