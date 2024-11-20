import { Badge } from '@/shared/ui/badge'
import * as React from 'react'

export interface IconLabelBadgeProps {
  icon: React.ReactNode
  label: string
  badgeCount?: number
}

const IconLabelBadge: React.FC<IconLabelBadgeProps> = ({
  icon,
  label,
  badgeCount,
}) => {
  return (
    <div className='flex cursor-pointer flex-col items-center'>
      <div className='relative'>
        {icon}
        {badgeCount && (
          <Badge
            variant='destructive'
            className='absolute right-[-10px] top-[-10px]'
          >
            {badgeCount}
          </Badge>
        )}
      </div>

      <span>{label}</span>
    </div>
  )
}

export default IconLabelBadge
