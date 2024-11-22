'use client'
import React, { useEffect } from 'react'
import { Controller, UseFormReturn, useController } from 'react-hook-form'
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
import { format, startOfToday } from 'date-fns'
import Editor from '../editor'

interface IFieldRendererProps {
  field: FieldConfig
  form: UseFormReturn<any>
  name: string
  className?: string
  autoFocus?: boolean
  defaultValue?: string | number | boolean
}

const FieldRenderer: React.FC<IFieldRendererProps> = ({
  field,
  form,
  name,
  className,
  autoFocus,
  defaultValue,
}) => {
  const { control } = form;


  const renderInputField = () => (
    <FormField
      control={control}
      name={name}
      render={({ field: formField }) => (
        <FormItem className={cn('col-span-12', className, field.className)}>
          {field.label && <FormLabel>{field.label}</FormLabel>}
          <FormControl>
            <FormInput
              type={field.type}
              autoFocus={autoFocus}
              placeholder={field.placeholder}
              defaultValue={typeof defaultValue === 'boolean' ? defaultValue.toString() : defaultValue}
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
    case 'text':
    case 'email':
    case 'number':
    case 'password':
      return renderInputField()
    case 'select':
      return (
        <FormField
          control={control}
          defaultValue={defaultValue}
          name={name}
          render={({ field: formField }) => (
            <FormItem className={cn('col-span-12', className, field.className)}>
              {field.label && <FormLabel>{field.label}</FormLabel>}
              <FormSelect
                onValueChange={formField.onChange}
                // defaultValue={formField.value}
              >
                <FormControl>
                  <FormSelectTrigger autoFocus={autoFocus}>
                    {defaultValue ? defaultValue : (
                      <FormSelectValue
                        placeholder={field.placeholder || 'Select...'}
                      /> 
                    )}
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
                        `до ${format(formField.value, 'dd.MM.yyyy HH:mm')}`
                      ) : defaultValue && typeof defaultValue !== 'boolean' ? `до ${format(defaultValue, 'dd.MM.yyyy HH:mm')}` 
                      : (
                        <span>{field.placeholder}</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    fromDate={startOfToday()}
                    toDate={
                      typeof field.toDate === 'function'
                        ? field.toDate(form.watch)
                        : field.toDate
                    }
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
      console.log(typeof defaultValue === 'boolean')
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field: formField }) => {
            return (
              <div className="col-span-12 flex flex-row items-center gap-[8px]">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={formField.onChange}
                    className="sr-only peer"
                    defaultChecked={typeof defaultValue === 'boolean' ? defaultValue : undefined}
                    // defaultValue={defaultValue}
                  />
                  <div
                    className="w-8 h-4 bg-[#CBD5E0] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300
                              dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600 peer-checked:after:translate-x-4
                              after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white
                              after:rounded-full after:h-3 after:w-3
                              after:transition-all peer-checked:after:bg-white"
                  ></div>
                </label>
                <span className="text-[14px] font-[700] text-[#2D3748]">{field.label}</span>
              </div>
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
                  defaultValue={defaultValue?.toString()}
                />
              </FormControl>
              {field.description && (
                <FormDescription>
                  {field.description}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case 'richText2':
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
