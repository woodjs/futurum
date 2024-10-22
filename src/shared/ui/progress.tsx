'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/shared/lib/utils'

type TProgress = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  indicatorClassName?: string
  showIndicatorValue?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  TProgress
>(
  (
    { className, value, indicatorClassName, showIndicatorValue, ...props },
    ref,
  ) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        className,
        showIndicatorValue && 'relative',
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full w-full flex-1 bg-primary transition-all',
          indicatorClassName,
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
      {showIndicatorValue ? (
        <span className='absolute left-[50%] top-[50%] translate-y-[-50%] text-sm text-[#2D3748]'>
          {value}%
        </span>
      ) : null}
    </ProgressPrimitive.Root>
  ),
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
