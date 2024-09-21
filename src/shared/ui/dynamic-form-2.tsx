'use client'
import React from 'react'
import {
  useForm,
  Controller,
  UseFormReturn,
  FieldValues,
  UseFormStateReturn,
  ControllerFieldState,
  ControllerRenderProps,
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import { Button } from './button'
import { FormInput } from './form-input'
import {
  FormSelect,
  FormSelectContent,
  FormSelectItem,
  FormSelectTrigger,
  FormSelectValue,
} from './form-select'
import { Checkbox } from './checkbox'
import { cn } from '../lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { PopoverContent, Popover, PopoverTrigger } from './popover'
import { Calendar } from './calendar'
import { Matcher } from 'react-day-picker'

// Типы для поля
type FieldType = 'input' | 'select' | 'checkbox' | 'date' | 'custom'

interface FiledBase {
  name: string
  type: FieldType
  placeholder?: string
  validation?: z.ZodTypeAny
  label?: string
  description?: string
  className?: string
}

// Интерфейс для конфигурации одного поля

interface FieldInput extends FiledBase {
  type: 'input'
}

interface FieldSelect extends FiledBase {
  type: 'select'
  options: {
    label: string
    value: string
  }[]
}

interface FieldCheckbox extends FiledBase {
  type: 'checkbox'
  label: string
}

interface FieldDate extends FiledBase {
  type: 'date'
  fromDate?: Date
  toDate?: Date
  disabled?: Matcher | Matcher[] | undefined
}

interface FieldCustom extends FiledBase {
  type: 'custom'
  renderField: (data: {
    field: ControllerRenderProps<FieldValues, string>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<FieldValues>
  }) => React.ReactElement
}

type FieldConfig =
  | FieldInput
  | FieldSelect
  | FieldCheckbox
  | FieldDate
  | FieldCustom

// Интерфейс для конфигурации всей формы
interface FormConfig {
  fields: FieldConfig[]
}
interface FormProps {
  config: FormConfig
  renderFooter?: (form: UseFormReturn) => React.ReactNode
}

// Динамический компонент формы
const DynamicForm: React.FC<FormProps> = ({ config, renderFooter }) => {
  // Генерируем схему валидации Zod на основе конфигурации полей
  const schema = z.object(
    config.fields.reduce(
      (acc, field) => {
        acc[field.name] = field.validation || z.any().optional()
        return acc
      },
      {} as Record<string, z.ZodTypeAny>,
    ),
  )

  // Инициализация формы
  const form = useForm({
    resolver: zodResolver(schema),
  })

  // Обработчик отправки формы
  const onSubmit = (data: any) => {
    console.log('Форма отправлена:', data)
  }

  // Рендеринг полей на основе их типа
  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case 'input':
        return (
          <FormField
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className={cn('col-span-12', field.className)}>
                {field.label && <FormLabel>{field.label}</FormLabel>}
                <FormControl>
                  <FormInput placeholder='Enter your username' {...formField} />
                </FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case 'select':
        return (
          <FormField
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className={cn('col-span-12', field.className)}>
                {field.label && <FormLabel>{field.label}</FormLabel>}

                <FormSelect
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <FormControl>
                    <FormSelectTrigger>
                      <FormSelectValue placeholder='Select a verified email to display' />
                    </FormSelectTrigger>
                  </FormControl>
                  <FormSelectContent>
                    {field.options?.map(option => (
                      <FormSelectItem key={option.value} value={option.value}>
                        {option.label}
                      </FormSelectItem>
                    ))}
                  </FormSelectContent>
                </FormSelect>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case 'date':
        return (
          <FormField
            control={form.control}
            name='dob'
            render={({ field: formField }) => (
              <FormItem
                className={cn('col-span-12 flex flex-col', field.className)}
              >
                {field.label && <FormLabel>{field.label}</FormLabel>}
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <button
                        className={cn(
                          `group/trigger box-border flex h-[40px] w-full items-center justify-between
                          rounded-md border border-transparent-gray bg-white px-3 py-2 text-sm
                          placeholder:text-muted-foreground disabled:cursor-not-allowed
                          disabled:opacity-50 data-[state=open]:border-primary [&>span]:line-clamp-1`,
                        )}
                      >
                        {formField.value ? (
                          format(formField.value, 'PPP')
                        ) : (
                          <span>{field?.placeholder}</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      fromDate={field.fromDate}
                      toDate={field.toDate}
                      selected={formField.value}
                      onSelect={formField.onChange}
                      disabled={field.disabled}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case 'checkbox':
        return (
          <FormField
            control={form.control}
            name={field.name}
            render={({ field: formField }) => {
              return (
                <FormItem
                  className={cn(
                    'col-span-12 flex flex-row items-center space-x-3 space-y-0',
                    field.className,
                  )}
                >
                  <FormControl>
                    <Checkbox
                      onCheckedChange={formField.onChange}
                      checked={formField.value}
                    />
                  </FormControl>
                  <div className='w-full'>
                    <FormLabel className='font-normal'>{field.label}</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )
            }}
          />
        )
      case 'custom':
        return (
          <FormField
            control={form.control}
            name={field.name}
            render={field.renderField}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='grid grid-cols-12 gap-4'>
      <Form {...form}>
        {config.fields.map(renderField)}
        <div className='col-span-12'>
          {typeof renderFooter === 'function' ? (
            renderFooter(form)
          ) : (
            <Button type='submit'>Отправить</Button>
          )}
        </div>
      </Form>
    </div>
  )
}

export default DynamicForm
