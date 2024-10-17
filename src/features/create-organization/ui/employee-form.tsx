'use client'

import {
  useForm,
  useFieldArray,
  Controller,
  useFormContext,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { employeesSchema } from '@/entities/organization'
import { z } from 'zod'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { FormInput } from '@/shared/ui/form-input'
import { NormalButton } from '@/shared/ui/normal-button'
import FileUpload from '@/shared/ui/file-upload'

type EmployeeFormValues = z.infer<typeof employeesSchema>

const EmployeeForm = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<EmployeeFormValues>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees',
  })

  return (
    <div className='grid gap-4'>
      {fields.map((field, index) => (
        <div key={field.id} className='grid gap-4'>
          <Controller
            control={control}
            name={`employees.${index}.firstName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <FormInput placeholder='Введите имя...' {...field} />
                </FormControl>
                {errors.employees?.[index]?.firstName && (
                  <FormMessage>
                    {errors.employees?.[index]?.firstName.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <Controller
            control={control}
            name={`employees.${index}.lastName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <FormInput
                    placeholder='Введите фамилию или первую букву...'
                    {...field}
                  />
                </FormControl>
                {errors.employees?.[index]?.lastName && (
                  <FormMessage>
                    {errors.employees?.[index]?.lastName.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <Controller
            control={control}
            name={`employees.${index}.futurumAccount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Аккаунт в Futurum</FormLabel>
                <FormControl>
                  <FormInput placeholder='Ссылка...' {...field} />
                </FormControl>
                {errors.employees?.[index]?.futurumAccount && (
                  <FormMessage>
                    {errors.employees?.[index]?.futurumAccount.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <Controller
            control={control}
            name={`employees.${index}.phone`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <FormInput placeholder='Введите телефон...' {...field} />
                </FormControl>
                {errors.employees?.[index]?.phone && (
                  <FormMessage>
                    {errors.employees?.[index]?.phone.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <Controller
            control={control}
            name={`employees.${index}.telegram`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telegram</FormLabel>
                <FormControl>
                  <FormInput placeholder='Введите Telegram...' {...field} />
                </FormControl>
                {errors.employees?.[index]?.telegram && (
                  <FormMessage>
                    {errors.employees?.[index]?.telegram.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <Controller
            control={control}
            name={`employees.${index}.avatar`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фотография сотрудника</FormLabel>
                <FormControl>
                  <FileUpload
                    multiple={false}
                    maxFiles={1}
                    name='avatar'
                    accept='image/png, image/jpeg, image/jpg'
                    // label='Фотография сотрудника'
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                {errors.employees?.[index]?.avatar && (
                  <FormMessage>
                    {errors.employees?.[index]?.avatar.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <NormalButton
            variant='ghost'
            className='text-destructive hover:bg-destructive-foreground hover:text-destructive'
            onClick={() => remove(index)}
          >
            Удалить сотрудника
          </NormalButton>
        </div>
      ))}

      <NormalButton
        variant='ghost'
        type='button'
        onClick={() =>
          append({
            firstName: '',
            lastName: '',
            futurumAccount: '',
            phone: '',
            telegram: '',
          })
        }
      >
        Добавить сотрудника
      </NormalButton>
    </div>
  )
}

export default EmployeeForm
