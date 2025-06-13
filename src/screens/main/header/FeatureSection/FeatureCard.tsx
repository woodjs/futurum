import { cn } from '@/shared/lib/utils'
import { FC } from 'react'

interface IFeatureCardProps {
  isActive?: boolean
  Title: React.ReactNode
  subtitle?: string
  Image: React.ReactNode
  className?: string
}

const FeatureCard: FC<IFeatureCardProps> = ({
  isActive,
  Title,
  subtitle,
  Image,
  className,
}) => {
  return (
    <div
      className={cn(
        `relative box-border flex min-h-[120px] flex-col items-center justify-center
        overflow-hidden rounded-2xl bg-secondary py-[12px] text-center lg:flex-row
        lg:items-start lg:justify-between lg:pl-[12px] lg:text-left`,
        `duration-150 hover:bg-gradient-to-r hover:from-[#0052D4] hover:via-[#4364F7]
        hover:to-[#6FB1FC] hover:text-white`,
        isActive &&
          'bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC] text-white',
        className,
      )}
    >
      <div className='z-10'>
        {Title}
        {subtitle && (
          <span className='mx-auto block max-w-[174px] text-[12px] font-bold lg:mx-0 lg:text-[16px]'>
            {subtitle}
          </span>
        )}
      </div>
      {Image}
    </div>
  )
}

export default FeatureCard
