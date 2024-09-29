'use client'
import * as React from 'react'
import { flexRender } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/shared/ui/table'

const TanstackTable = <TData,>({ tableInstance }) => {
  return (
    <div className='p-2'>
      <Table className='bg-[#F8F9FB]'>
        <TableHeader>
          {tableInstance.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  className='text-[10px] uppercase text-[#4F4F4F]'
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {tableInstance.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {tableInstance.getFooterGroups().map(footerGroup => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <TableHeader key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </div>
  )
}

export default TanstackTable
