'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { Badge } from '@/shared/ui/badge'

import { cn } from '@/shared/lib/utils'

interface ITabsTrigger
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  badge: string
}

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center text-muted-foreground',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  ITabsTrigger
>(({ className, children, badge, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      `inline-flex items-center justify-center whitespace-nowrap border-b-2
      border-[#A0AEC0E5] px-3 py-1.5 text-2xl font-medium text-[#A0AEC0E5]
      ring-offset-background transition-all focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      disabled:pointer-events-none disabled:opacity-50
      data-[state=active]:border-[#046EB5] data-[state=active]:bg-background
      data-[state=active]:text-[#046EB5] data-[state=active]:shadow-sm`,
      className,
    )}
    {...props}
  >
    <div className='relative'>
      {children}
      {badge ? (
        <Badge
          className='absolute right-[-20px] top-[-5px] rounded-full bg-[#A0AEC0E5] p-0.5 text-[6px]
            text-white'
        >
          {badge}
        </Badge>
      ) : null}
    </div>
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      `mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-ring focus-visible:ring-offset-2`,
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
