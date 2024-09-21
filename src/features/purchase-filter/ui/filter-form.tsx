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
    type: 'input',
    name: 'fromPrice',
    label: 'FromPrice',
    placeholder: 'EnterPrice',
    className: 'col-span-6',
  },
  toPrice: {
    type: 'input',
    name: 'toPrice',
    label: 'To price',
    placeholder: 'EnterPrice',
    className: 'col-span-6',
  },
}

export const PurchaseFilterForm = () => {
  const t = useTranslations('Purchase.Filters')
  const { filters, setFilters, removeFilter } = usePurchaseStore()
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
        <div className='flex h-14 items-center gap-2'>
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
                <div key={key} className='flex items-center'>
                  <button
                    className={cn(
                      normalButtonVariants({
                        size: 'sm',
                        variant: 'outline',
                      }),
                      'h-8 rounded-r-none border-r-0 pr-[5px]',
                    )}
                    onClick={() => openWithAutoFocus(key)}
                  >
                    <PurchaseFiltersFormatter id={key} value={filters[key]} />
                  </button>
                  <button
                    className={cn(
                      normalButtonVariants({
                        size: 'sm',
                        variant: 'outline',
                      }),
                      `h-8 rounded-l-none border-l-0 pl-[5px] pr-[10px] text-slate-500
                      hover:text-slate-700`,
                    )}
                    onClick={() => deleteFilter(key)}
                  >
                    <XCircleIcon className='size-[16px]' />
                  </button>
                </div>
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
              },
              toDate: {
                type: 'date',
                label: t('ToDate'),
                placeholder: t('SelectDate'),
                className: 'col-span-6',
              },
              fromPrice: {
                type: 'input',
                label: t('FromPrice'),
                placeholder: t('EnterPrice'),
                className: 'col-span-6',
              },
              toPrice: {
                type: 'input',
                label: t('ToPrice'),
                placeholder: t('EnterPrice'),
                className: 'col-span-6',
              },
            }}
            useFormProps={{
              defaultValues: filters,
            }}
            classNames={{
              form: 'gap-y-6',
            }}
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
