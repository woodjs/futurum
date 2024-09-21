'use client'
import React from 'react'
import { useController } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '../form'
import { FieldConfig } from './types'
import { FormInput } from '../form-input'
import { Checkbox } from '../checkbox'
import { CalendarIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import {
  FormSelect,
  FormSelectContent,
  FormSelectItem,
  FormSelectTrigger,
  FormSelectValue,
} from '../form-select'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Calendar } from '../calendar'
import { format } from 'date-fns'
import Editor from '../editor'

interface IFieldRendererProps {
  field: FieldConfig
  form: any
  name: string
  className?: string
  autoFocus?: boolean
}

const FieldRenderer: React.FC<IFieldRendererProps> = ({
  field,
  form,
  name,
  className,
  autoFocus,
}) => {
  const { control } = form

  // Логика для маски полей типа "input"
  const renderInputField = () => (
    <FormField
      control={control}
      name={name}
      render={({ field: formField }) => (
        <FormItem className={cn('col-span-12', className, field.className)}>
          {field.label && <FormLabel>{field.label}</FormLabel>}
          <FormControl>
            <FormInput
              autoFocus={autoFocus}
              placeholder={field.placeholder}
              {...formField}
            />
          </FormControl>
          {field.description && (
            <FormDescription>{field.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )

  // Логика для остальных типов полей
  switch (field.type) {
    case 'input':
      return renderInputField()
    case 'select':
      return (
        <FormField
          control={control}
          name={name}
          render={({ field: formField }) => (
            <FormItem className={cn('col-span-12', className, field.className)}>
              {field.label && <FormLabel>{field.label}</FormLabel>}
              <FormSelect
                onValueChange={formField.onChange}
                defaultValue={formField.value}
              >
                <FormControl>
                  <FormSelectTrigger autoFocus={autoFocus}>
                    <FormSelectValue
                      placeholder={field.placeholder || 'Select...'}
                    />
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
          control={control}
          name={name}
          render={({ field: formField }) => (
            <FormItem
              className={cn(
                'col-span-12 flex flex-col',
                className,
                field.className,
              )}
            >
              {field.label && <FormLabel>{field.label}</FormLabel>}
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <button
                      autoFocus={autoFocus}
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
                        <span>{field.placeholder}</span>
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
          name={name}
          render={({ field: formField }) => {
            return (
              <FormItem
                className={cn(
                  'col-span-12 flex flex-row items-center space-x-3 space-y-0',
                  className,
                  field.className,
                )}
              >
                <FormControl>
                  <Checkbox
                    autoFocus={autoFocus}
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
    case 'richText':
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field: formField }) => (
            <FormItem className={cn('col-span-12', className, field.className)}>
              {field.label && <FormLabel>{field.label}</FormLabel>}
              <FormControl>
                <Editor
                  content={formField.value}
                  onContentChange={formField.onChange}
                />
              </FormControl>
              {field.description && (
                <FormDescription>{field.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case 'custom':
      return (
        <FormField
          control={form.control}
          name={name}
          render={field.renderField}
        />
      )
    default:
      return null
  }
}

export default FieldRenderer
