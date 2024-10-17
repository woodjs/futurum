'use client'
import { z } from 'zod'
import { startPageSchema } from '@/entities/organization'
import { Controller, useFormContext } from 'react-hook-form'
import FileUpload from '@/shared/ui/file-upload'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { FormInput } from '@/shared/ui/form-input'

type StartPageValues = z.infer<typeof startPageSchema>
const StartPageForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<StartPageValues>()

  return (
    <div className='grid gap-4'>
      {/* Поле для загрузки презентации */}
      <Controller
        name='amountForStart'
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Сумма для старта</FormLabel>
            <FormControl>
              <FormInput
                type='number'
                placeholder='Введите сумму...'
                {...field}
                onChange={e => {
                  field.onChange(e.target.valueAsNumber)
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Controller
        name='files'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='files'
            label='Файлы (до 10, PNG, JPG)'
            accept={'image/png, image/jpeg, image/jpg, image/webp'}
            multiple={true}
            maxFiles={10}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={errors.files?.message as string}
          />
        )}
      />
    </div>
  )
}

export default StartPageForm
