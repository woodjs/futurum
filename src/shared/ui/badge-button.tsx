import { FC } from 'react'
import { cn } from '../lib/utils'
import { normalButtonVariants } from './normal-button'
import { XCircleIcon } from '@heroicons/react/16/solid'
import { VariantProps } from 'class-variance-authority'

interface BadgeButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  classNames?: {
    button?: string
    closeButton?: string
    wrapper?: string
  }
  onClose?: () => void
  variant?: VariantProps<typeof normalButtonVariants>['variant']
  size?: VariantProps<typeof normalButtonVariants>['size']
}

const BadgeButton: FC<BadgeButtonProps & {}> = ({
  className,
  classNames,
  onClose,
  variant = 'outline',
  size = 'sm',
  ...props
}) => {
  return (
    <div className={cn('flex items-center', classNames?.wrapper)}>
      <button
        className={cn(
          normalButtonVariants({
            size: size,
            variant: variant,
          }),
          'h-8 rounded-r-none border-r-0 pr-[5px]',
          className,
          classNames?.button,
        )}
        {...props}
      />
      <button
        className={cn(
          normalButtonVariants({
            size: size,
            variant: variant,
          }),
          `h-8 rounded-l-none border-l-0 pl-[5px] pr-[10px] text-slate-500
          hover:text-slate-700`,
          classNames?.closeButton,
        )}
        onClick={onClose}
      >
        <XCircleIcon className='size-[16px]' />
      </button>
    </div>
  )
}

export default BadgeButton
