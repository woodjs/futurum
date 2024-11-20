import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const normalButtonVariants = cva(
  'font inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full text-lg ring-offset-background transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-gradient-accent-start to-gradient-accent-end bg-[length:100%] font-semibold text-white transition-all duration-200 hover:bg-[length:150%] hover:brightness-[90%] active:brightness-[70%]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-slate-200 bg-transparent text-slate-800 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800 active:bg-slate-200',
        secondary:
          'bg-slate-200 text-slate-700 hover:bg-slate-200/80 hover:text-slate-500 active:bg-slate-100',
        ghost:
          'text-slate-700 hover:bg-accent hover:text-black active:bg-slate-200',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        lg: 'px-[40px] py-[10px] text-lg',
        default: 'px-[24px] py-[10px] text-base',
        sm: 'px-[20px] py-[8px] text-sm',
        icon: 'h-10 w-10 [&>svg]:size-6',
        'icon-lg': 'h-12 w-12 [&>svg]:size-8',
        'icon-sm': 'h-8 w-8 [&>svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof normalButtonVariants> {
  asChild?: boolean
}

const NormalButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(normalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

NormalButton.displayName = 'NormalButton'

export { NormalButton, normalButtonVariants }
