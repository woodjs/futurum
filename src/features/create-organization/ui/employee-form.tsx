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
import { useTranslations } from 'next-intl'

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

  const t = useTranslations()

  return (
    <div className='grid gap-4'>
      {fields.map((field, index) => (
        <div key={field.id} className='grid gap-4'>
          <Controller
            control={control}
            name={`employees.${index}.firstName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('organization.form.startPage.employee.firstName.label')}
                </FormLabel>
                <FormControl>
                  <FormInput
                    placeholder={t(
                      'organization.form.startPage.employee.firstName.placeholder',
                    )}
                    {...field}
                  />
                </FormControl>
                {errors.employees?.[index]?.firstName && (
                  <FormMessage useTranslate>
                    {t(errors.employees?.[index]?.firstName.message)}
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
                <FormLabel>
                  {t('organization.form.startPage.employee.lastName.label')}
                </FormLabel>
                <FormControl>
                  <FormInput
                    placeholder={t(
                      'organization.form.startPage.employee.lastName.placeholder',
                    )}
                    {...field}
                  />
                </FormControl>
                {errors.employees?.[index]?.lastName && (
                  <FormMessage useTranslate>
                    {t(errors.employees?.[index]?.lastName.message)}
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
                <FormLabel>
                  {t(
                    'organization.form.startPage.employee.futurumAccount.label',
                  )}
                </FormLabel>
                <FormControl>
                  <FormInput
                    placeholder={t(
                      'organization.form.startPage.employee.futurumAccount.placeholder',
                    )}
                    {...field}
                  />
                </FormControl>
                {errors.employees?.[index]?.futurumAccount && (
                  <FormMessage useTranslate>
                    {t(errors.employees?.[index]?.futurumAccount.message)}
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
                <FormLabel>
                  {t('organization.form.startPage.employee.phone.label')}
                </FormLabel>
                <FormControl>
                  <FormInput
                    placeholder={t(
                      'organization.form.startPage.employee.phone.placeholder',
                    )}
                    {...field}
                  />
                </FormControl>
                {errors.employees?.[index]?.phone && (
                  <FormMessage useTranslate>
                    {t(errors.employees?.[index]?.phone.message)}
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
                <FormLabel>
                  {t('organization.form.startPage.employee.telegram.label')}
                </FormLabel>
                <FormControl>
                  <FormInput
                    placeholder={t(
                      'organization.form.startPage.employee.telegram.placeholder',
                    )}
                    {...field}
                  />
                </FormControl>
                {errors.employees?.[index]?.telegram && (
                  <FormMessage useTranslate>
                    {t(errors.employees?.[index]?.telegram.message)}
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
                <FormLabel>
                  {t('organization.form.startPage.employee.avatar.label')}
                </FormLabel>
                <FormControl>
                  <FileUpload
                    multiple={false}
                    maxFiles={1}
                    name='avatar'
                    accept='image/png, image/jpeg, image/jpg'
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                {errors.employees?.[index]?.avatar && (
                  <FormMessage useTranslate>
                    {t(errors.employees?.[index]?.avatar.message)}
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
            {t('organization.form.startPage.employees.removeEmployee')}
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
        {t('organization.form.startPage.employees.addEmployee')}
      </NormalButton>
    </div>
  )
}

export default EmployeeForm
