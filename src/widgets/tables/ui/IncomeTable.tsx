'use client'

import TenstackTable from '../../../shared/ui/tanstackTable'
import { useTranslations } from 'next-intl'

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

export type InvestorPayout = {
  NFTName: string
  investmentAmount: string
  payoutRate: string
  payoutForPeriod: string
  closestPayout: Date | string
  payoutReminder: string
  annualIncome: string
  paybackDate: Date | string
}

export const IncomeTable = () => {
  const t = useTranslations('Tables.IncomeTable')

  const defaultData: InvestorPayout[] = [
    {
      NFTName: 'Морские грузоперевозки',
      investmentAmount: '$ 30 000,00',
      payoutRate: 'Раз в месяц',
      payoutForPeriod: '$ 30 000,00',
      closestPayout: '15.08.2024',
      payoutReminder: 'Через 23 дня',
      annualIncome: '$ 0,00',
      paybackDate: '15.08.2024',
    },
    {
      NFTName: 'Морские грузоперевозки',
      investmentAmount: '$ 30 000,00',
      payoutRate: 'Раз в месяц',
      payoutForPeriod: '$ 30 000,00',
      closestPayout: '15.08.2024',
      payoutReminder: 'Через 23 дня',
      annualIncome: '$ 0,00',
      paybackDate: '15.08.2024',
    },
    {
      NFTName: 'Морские грузоперевозки',
      investmentAmount: '$ 30 000,00',
      payoutRate: 'Раз в месяц',
      payoutForPeriod: '$ 30 000,00',
      closestPayout: '15.08.2024',
      payoutReminder: 'Через 23 дня',
      annualIncome: '$ 0,00',
      paybackDate: '15.08.2024',
    },
  ]

  const defaultColumns: ColumnDef<InvestorPayout>[] = [
    {
      accessorKey: 'NFTName',
      header: t('Header.NFTName'),
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'investmentAmount',
      header: t('Header.AssetBalance'),
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'payoutRate',
      header: t('Header.PayoutFrequency'),
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'payoutForPeriod',
      header: t('Header.MonthlyIncome'),
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'closestPayout',
      header: t('Header.ClosestPayout'),
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'payoutReminder',
      header: t('Header.PayoutStatus'),
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'annualIncome',
      header: t('Header.AnnualIncome'),
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'paybackDate',
      header: t('Header.ReturnDate'),
      cell: info => info.getValue(),
    },
  ]

  const tableInstance = useReactTable({
    data: defaultData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <TenstackTable tableInstance={tableInstance} />
}
