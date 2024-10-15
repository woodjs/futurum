import { FC } from 'react'
import { IEmployeeInfo } from '../model'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import Link from 'next/link'
import { getIdFromLink } from '../lib'

interface IEmployeesViewProps {
  employees: IEmployeeInfo[]
  id: string
  edit?: FC<{ id: string }>
}

export const EmployeesView: FC<IEmployeesViewProps> = ({
  employees,
  id,
  edit,
}) => {
  return (
    <div className='mt-6'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-xl font-bold'>Сотрудники</div>
        {edit && edit({ id })}
      </div>
      <div className='mt-4 rounded-lg bg-slate-100 p-4'>
        <div className='flex flex-col gap-6'>
          {employees?.map((employee, index) => (
            <div
              key={index}
              className='flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm transition-shadow
                duration-300 hover:shadow-md'
            >
              <Avatar className='h-16 w-16'>
                <AvatarImage
                  src={employee.avatar?.url}
                  alt={employee.firstName}
                  className='rounded-full object-cover'
                />
                <AvatarFallback className='bg-gray-100 rounded-full'>
                  {employee.firstName[0]}
                </AvatarFallback>
              </Avatar>

              <div className='flex flex-col'>
                <Link
                  href={employee.link}
                  className='text-lg font-semibold text-blue-600 hover:underline'
                >
                  {employee.firstName}
                </Link>
                <a
                  href={`tel:${employee.phone}`}
                  className='text-gray-600 hover:text-gray-800 text-sm'
                >
                  {employee.phone}
                </a>
                <a
                  href={employee.telegram}
                  className='text-gray-600 hover:text-gray-800 text-sm'
                >
                  @{getIdFromLink(employee.telegram, 'telegram')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
