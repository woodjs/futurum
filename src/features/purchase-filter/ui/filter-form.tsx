'use client'
import { DynamicForm } from '@/shared/ui/dynamic-form'
import { NFTCategoryOptionList } from '@/entities/category'
import { Button } from '@/shared/ui'
import { object, z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import {
  PurchaseFiltersFormatter,
  usePurchaseStore,
} from '@/entities/purchases'
import { useCallback, useState } from 'react'
import { FieldConfig } from '@/shared/ui/dynamic-form/types'
import { IPurchaseParams } from '@/entities/purchases/api'
import { cn } from '@/shared/lib/utils'
import { PlusIcon } from '@heroicons/react/24/solid'
import { NormalButton, normalButtonVariants } from '@/shared/ui/normal-button'
import { FunnelIcon, XCircleIcon } from '@heroicons/react/16/solid'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { preprocessStringToNumber } from '@/shared/lib/preprocess-srting-to-number'
import BadgeButton from '@/shared/ui/badge-button'

const fields: Record<keyof IPurchaseParams, FieldConfig> = {
  category: {
    type: 'select',
    label: 'Category',
    placeholder: 'SelectCategory',
    options: NFTCategoryOptionList,
  },
  fromDate: {
    type: 'date',
    name: 'fromDate',
    label: 'FromDate',
    placeholder: 'SelectDate',
    className: 'col-span-6',
  },
  toDate: {
    type: 'date',
    name: 'toDate',
    label: 'ToDate',
    placeholder: 'SelectDate',
    className: 'col-span-6',
  },
  fromPrice: {
    type: 'number',
    name: 'fromPrice',
    label: 'FromPrice',
    placeholder: 'EnterPrice',
    className: 'col-span-6',
  },
  toPrice: {
    type: 'number',
    name: 'toPrice',
    label: 'To price',
    placeholder: 'EnterPrice',
    className: 'col-span-6',
  },
}

export const PurchaseFilterForm = () => {
  const t = useTranslations('default.Purchase.Filters')
  const { filters, setFilters, removeFilter } = usePurchaseStore()
  const [formState, setFormState] = useState<{
    fromDate?: any
    toDate?: any
    category?: any
    fromPrice?: any
    toPrice?: any
  }>()
  const [open, setOpen] = useState(false)
  const [autoFocusField, setAutoFocusField] = useState<keyof IPurchaseParams>()

  const openWithAutoFocus = useCallback((field?: keyof IPurchaseParams) => {
    setAutoFocusField(field)
    setOpen(true)
  }, [])

  const deleteFilter = useCallback((field: keyof IPurchaseParams) => {
    removeFilter(field)
    setAutoFocusField(undefined)
  }, [])

  const filterKeys = Object.keys(filters || {}) as (keyof IPurchaseParams)[]
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className='my-[20px] flex h-14 items-center gap-2'>
          <DialogTrigger asChild>
            <NormalButton
              variant='secondary'
              size={
                filters && filterKeys.filter(key => !!filters[key]).length > 0
                  ? 'icon-sm'
                  : 'sm'
              }
            >
              {filters &&
              filterKeys.filter(key => !!filters[key]).length > 0 ? (
                <Plus className='size-6' />
              ) : (
                t('AddFilter')
              )}
            </NormalButton>
          </DialogTrigger>
          {filters &&
            filterKeys
              .filter(key => !!filters[key])
              .map(key => (
                <BadgeButton
                  key={key}
                  onClick={() => openWithAutoFocus(key)}
                  onClose={() => deleteFilter(key)}
                >
                  <PurchaseFiltersFormatter id={key} value={filters[key]} />
                </BadgeButton>
              ))}
        </div>
        <DialogContent>
          <DialogTitle className='mb-[20px]'>{t('Title')}</DialogTitle>
          <DynamicForm
            fields={{
              category: {
                type: 'select',
                label: t('Category'),
                placeholder: t('SelectCategory'),
                options: NFTCategoryOptionList,
              },
              fromDate: {
                type: 'date',
                label: t('FromDate'),
                placeholder: t('SelectDate'),
                className: 'col-span-6',
                toDate: watch => watch('toDate'),
              },
              toDate: {
                type: 'date',
                label: t('ToDate'),
                placeholder: t('SelectDate'),
                className: 'col-span-6',
                fromDate: watch => watch('fromDate'),
              },
              fromPrice: {
                type: 'number',
                label: t('FromPrice'),
                placeholder: t('EnterPrice'),
                className: 'col-span-6',
                validation: z
                  .preprocess(
                    preprocessStringToNumber,
                    z.number().positive().min(0).max(Infinity).optional(),
                  )
                  .optional(),
              },
              toPrice: {
                type: 'number',
                label: t('ToPrice'),
                placeholder: t('EnterPrice'),
                className: 'col-span-6',
                validation: z
                  .preprocess(
                    preprocessStringToNumber,
                    z.number().positive().min(0).max(Infinity).optional(),
                  )
                  .optional(),
              },
            }}
            useFormProps={{
              defaultValues: filters,
            }}
            classNames={{
              form: 'gap-y-6',
            }}
            onFormUpdate={data => setFormState(data)}
            autoFocusField={autoFocusField}
            renderFooter={({ handleSubmit }) => (
              <div className='mt-[30px] flex w-full justify-end'>
                <NormalButton
                  variant='ghost'
                  onClick={() => {
                    setFilters({})
                    setOpen(false)
                  }}
                >
                  {t('ResetFilters')}
                </NormalButton>
                <NormalButton
                  className='ml-2'
                  onClick={handleSubmit(data => {
                    setFilters({ ...filters, ...data })
                    setOpen(false)
                  })}
                >
                  {t('Apply')}
                </NormalButton>
              </div>
            )}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
