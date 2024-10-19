import { z } from 'zod'
import { Matcher } from 'react-day-picker'
import {
  DeepPartial,
  UseFormProps,
  UseFormReturn,
  UseFormWatch,
} from 'react-hook-form'

export type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'richText'
  | 'custom'

export interface FiledBase {
  name?: string
  type: FieldType
  placeholder?: string
  validation?: z.ZodTypeAny
  label?: string
  description?: string
  className?: string
}

export interface FieldInput extends FiledBase {
  type: 'text' | 'number' | 'email' | 'password'
  placeholder?: string
  validation?: z.ZodTypeAny
  label?: string
  description?: string
  className?: string
}

export interface FieldSelect extends FiledBase {
  type: 'select'
  options: {
    label: string
    value: string
  }[]
}

export interface FieldCheckbox extends FiledBase {
  type: 'checkbox'
  label: string
}

export interface FieldDate extends FiledBase {
  type: 'date'
  fromDate?: Date | ((watch: UseFormWatch<any>) => Date | undefined)
  toDate?: Date | ((watch: UseFormWatch<any>) => Date | undefined)
  disabled?: Matcher | Matcher[] | undefined
}

export interface FieldCustom extends FiledBase {
  type: 'custom'
  renderField: (data: any) => React.ReactElement
}

export interface FieldRichText extends FiledBase {
  type: 'richText'
}

export type FieldMap = {
  number: FieldInput
  email: FieldInput
  password: FieldInput
  text: FieldInput
  select: FieldSelect
  checkbox: FieldCheckbox
  date: FieldDate
  richText: FieldRichText
  custom: FieldCustom
}

export type FieldConfig = FieldMap[keyof FieldMap]

type FieldValue<T extends FieldConfig> = T extends FieldInput
  ? string
  : T extends FieldSelect
    ? string
    : T extends FieldCheckbox
      ? boolean
      : T extends FieldDate
        ? Date | null
        : T extends FieldRichText
          ? string
          : T extends FieldCustom
            ? any
            : never

export type FormData<T extends Record<string, FieldConfig>> = {
  [K in keyof T]: FieldValue<T[K]>
}
export interface FormProps<T extends Record<string, FieldConfig>> {
  fields: {
    [K in keyof T]: FieldMap[T[K]['type']]
  }
  classNames?: {
    field?: string
    form?: string
  }
  useFormProps?: Omit<UseFormProps<FormData<T>>, 'resolver'>
  autoFocusField?: keyof T
  // defaultValues?: Partial<FormData<T>>,
  renderFooter?: (form: UseFormReturn<FormData<T>>) => React.ReactNode
  onFormUpdate?: (data: DeepPartial<FormData<T>>, info: any) => void
  refine?: (data: any) => void
}
