'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { Badge } from '@/shared/ui/badge'

import { cn } from '@/shared/lib/utils'

interface ITabsTrigger
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  badge?: string
}

const TabsTariffsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      `relative inline-flex h-[68px] w-full max-w-[320px] items-center justify-center
      rounded-[60px] bg-gradient-to-r from-gradient-accent-start
      to-gradient-accent-end lg:max-w-[336px]`,
      className,
    )}
    {...props}
  />
))
TabsTariffsList.displayName = TabsPrimitive.List.displayName

const TabsTariffsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  ITabsTrigger
>(({ className, children, badge, ...props }, ref) => (
  <>
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        `z-10 inline-flex h-[48px] w-[150px] items-center justify-center
        whitespace-nowrap px-3 py-1.5 text-lg font-medium text-[#A0AEC0E5] text-white
        ring-offset-background transition-all focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        data-[state=active]:rounded-[500px] data-[state=active]:border-[#046EB5]
        data-[state=active]:bg-background data-[state=active]:text-black
        data-[state=active]:shadow-sm`,
        className,
      )}
      {...props}
    >
      <div className='relative'>{children}</div>
    </TabsPrimitive.Trigger>
    {badge && (
      <Badge
        variant={'outline'}
        className='absolute right-[-165px] top-[-15px] z-0 h-[40px] w-[200px] -skew-x-12
          rounded-[7px] bg-[#F5E050] p-0.5 text-[6px] text-lg font-extrabold text-black'
      >
        {badge}
      </Badge>
    )}
  </>
))
TabsTariffsTrigger.displayName = TabsPrimitive.Trigger.displayName

export { TabsTariffsList, TabsTariffsTrigger }
