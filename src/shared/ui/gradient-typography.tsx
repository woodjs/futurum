import { FC, ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

export interface TypographyProps extends React.ComponentPropsWithoutRef<'p'> {
  children: ReactNode
  variant?: keyof typeof textVariants
  className?: string
}

const gradientStyles =
  'bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end inline-block text-transparent bg-clip-text'

const textVariants = {
  h1: `font-bold text-[64px] leading-[77.45px] ${gradientStyles}`, //12 400
  h2: `font-bold text-[24px] lg:text-[42px] leading-[44px] ${gradientStyles}`, //16 400
  'subtitle-1': `font-bold text-[20px] leading-[26px] ${gradientStyles}`, //20 400
  h3: `font-bold text-[36px] lg:text-[36px] leading-[44px] ${gradientStyles}`,
}

const GradientTypography: FC<TypographyProps> = ({
  children,
  variant = 'h1',
  className,
  ...props
}) => {
  return (
    <span className={cn(textVariants[variant], className)} {...props}>
      {children}
    </span>
  )
}

export { GradientTypography }
