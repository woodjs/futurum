import { ChevronRight } from 'lucide-react'
import { FC } from 'react'
import { cn } from '../lib/utils'
import { Skeleton } from './skeleton'

interface IBigButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  classNames?: {
    button?: string
    icon?: string
    value?: string
    label?: string
    wrapper?: string
  }
  label: React.ReactNode
  children: React.ReactNode
  isLoading?: boolean
}

const BigButton: FC<IBigButtonProps> = ({
  className,
  classNames,
  children,
  label,
  isLoading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        `group/button flex w-full cursor-pointer items-center gap-[8px] rounded-xl
        px-[12px] py-[8px] duration-200 hover:bg-slate-100`,
        className,
        classNames?.button,
      )}
    >
      <div className={cn('flex flex-col', classNames?.wrapper)}>
        <div
          className={cn('text-left text-sm text-slate-400', classNames?.label)}
        >
          {label}
        </div>
        <div className={cn('text-xl font-bold text-black', classNames?.value)}>
          {isLoading ? (
            <Skeleton className='my-[2px] h-6 w-[90px] -translate-x-1 rounded-full' />
          ) : (
            children
          )}
        </div>
      </div>
      <ChevronRight
        className={cn(
          'ml-auto text-slate-400 duration-200 group-hover/button:translate-x-1',
          classNames?.icon,
        )}
      />
    </button>
  )
}

export default BigButton
