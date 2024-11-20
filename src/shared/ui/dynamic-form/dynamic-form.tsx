'use client'
import React, { useEffect, useMemo } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../button'
import { Form } from '../form'
import { FieldConfig, FormData, FormProps } from './types'
import FieldRenderer from './field-render'
import { cn } from '@/shared/lib/utils'

// Компонент DynamicForm с типизацией
const DynamicForm = <T extends Record<keyof T, FieldConfig>>({
  fields,
  autoFocusField,
  classNames,
  useFormProps,
  renderFooter,
  onFormUpdate,
  refine,
}: FormProps<T>) => {
  const fieldKeys = useMemo(() => {
    return Object.keys(fields) as (keyof T)[]
  }, [fields])
  // Генерация схемы валидации Zod на основе полей
  const schema = refine
    ? z
        .object(
          Object.entries(fields as Record<string, FieldConfig>).reduce(
            (acc, [key, field]) => {
              acc[key] = field.validation || z.any().optional()
              return acc
            },
            {} as Record<string, z.ZodTypeAny>,
          ),
        )
        .refine(refine)
    : z.object(
        Object.entries(fields as Record<string, FieldConfig>).reduce(
          (acc, [key, field]) => {
            acc[key] = field.validation || z.any().optional()
            return acc
          },
          {} as Record<string, z.ZodTypeAny>,
        ),
      )

  // Используем useForm, где данные формы имеют тип FormData<T>
  const form = useForm({
    resolver: zodResolver(schema),
    ...useFormProps,
  }) as UseFormReturn<FormData<T>>

  // Отслеживаем изменения формы и вызываем onFormUpdate
  useEffect(() => {
    const subscription = form.watch((data, info) => {
      if (typeof onFormUpdate === 'function') {
        onFormUpdate(data, info) // data типизировано как FormData<T>
      }
    })

    return () => subscription.unsubscribe()
  }, [form.watch, onFormUpdate])

  return (
    <div className={cn('grid grid-cols-12 gap-4', classNames?.form)}>
      <Form {...form}>
        {fieldKeys.map(key => {
          const field = fields[key]
          return (
            <FieldRenderer
              className={classNames?.field}
              key={key as string}
              name={key as string}
              field={field}
              form={form}
              autoFocus={autoFocusField === key}
            />
          )
        })}
        <div className='col-span-12'>
          {renderFooter ? (
            renderFooter(form)
          ) : (
            <Button type='submit'>Submit</Button>
          )}
        </div>
      </Form>
    </div>
  )
}

export { DynamicForm }
