'use client'
import { usePurchaseStore } from '@/entities/purchases'
import { PurchaseStatusFilter } from '@/entities/purchases/api'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs'

export const StatusFilter = () => {
  const { statusFilter, setStatusFilter } = usePurchaseStore()
  return (
    <Tabs
      value={statusFilter}
      onValueChange={value => setStatusFilter(value as PurchaseStatusFilter)}
    >
      <TabsList className='w-full *:w-full'>
        <TabsTrigger value={PurchaseStatusFilter.ALL}>Все</TabsTrigger>
        <TabsTrigger value={PurchaseStatusFilter.ACTIVE}>Активные</TabsTrigger>
        <TabsTrigger value={PurchaseStatusFilter.COMPLETED}>
          Завершенные
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
