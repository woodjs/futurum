import * as React from 'react'

import { cn } from '@/shared/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftSection?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftSection, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex items-center h-10 bg-light-gray rounded-full px-3 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      >
        {leftSection && <div className='mr-[16px]'>{leftSection}</div>}
        <input
          type={type}
          className={cn(
            'w-full h-full outline-none bg-transparent border-none',
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
