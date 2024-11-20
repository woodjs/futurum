import * as React from 'react'

import { cn } from '@/shared/lib/utils'

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, leftSection, rightSection, ...props }, ref) => {
    return (
      <div
        className={cn(
          `box-border flex h-[40px] items-center rounded-[6px] border
          border-transparent-gray bg-white focus-within:border-primary`,
          className,
        )}
      >
        {leftSection && <div className='ml-[16px]'>{leftSection}</div>}
        <input
          type={type}
          className={cn(
            `h-full w-full border-none bg-transparent pl-[16px] pr-[16px] outline-none
            placeholder:text-transparent-gray`,
          )}
          ref={ref}
          {...props}
        />
        {rightSection && <div className='mr-[16px]'>{rightSection}</div>}
      </div>
    )
  },
)
FormInput.displayName = 'FormInput'

export { FormInput }
