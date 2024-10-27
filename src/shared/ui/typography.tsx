import * as React from 'react'
import { cn } from '@/shared/lib/utils'

type TypographyProps<T extends React.ElementType = 'p'> = {
  as?: T
  children?: React.ReactNode
  variant?: keyof typeof textVariants
  className?: string
} & React.ComponentPropsWithoutRef<T>

const textVariants = {
  h2: 'font-bold text-[24px] lg:text-[42px] leading-[44px]', //42 700
  'subtitle-1': 'font-bold text-[20px] leading-[26px]', //20 700
  'p-large': 'font-normal text-[20px] leading-[26px]', //20 400
  'subtitle-2': 'text-[16px]/[20px] font-bold',
  'subtitle-3': 'text-[14px]/[18px] font-bold',
  h4: 'font-normal text-[24px]/[28px] font-bold',
  h5: 'text-[18px] font-bold leading-[24px]',
  p: 'font-normal text-[16px] leading-[20px]', //16 400
  'p-small': 'font-normal text-[12px] leading-[16px]', //12 400
  'p-small2': 'font-bold text-[12px] leading-[16px]', //12 700
}

const Typography = <T extends React.ElementType = 'p'>({
  children,
  as,
  variant = 'p',
  className,
  ...props
}: TypographyProps<T>) => {
  const Component = as || 'p'
  return (
    <Component className={cn(textVariants[variant], className)} {...props}>
      {children}
    </Component>
  )
}

export { Typography }
