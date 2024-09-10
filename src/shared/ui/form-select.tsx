'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

const FormSelect = SelectPrimitive.Root

const FormSelectGroup = SelectPrimitive.Group

const FormSelectValue = SelectPrimitive.Value

const FormSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      `group/trigger box-border flex h-[40px] w-full items-center justify-between
      rounded-md border border-transparent-gray bg-white px-3 py-2 text-sm
      placeholder:text-muted-foreground disabled:cursor-not-allowed
      disabled:opacity-50 data-[state=open]:border-primary [&>span]:line-clamp-1`,
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown
        className='h-[16px] w-[16px] transform opacity-50 duration-200
          group-data-[state=open]/trigger:rotate-180'
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
FormSelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const FormSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronUp className='h-4 w-4' />
  </SelectPrimitive.ScrollUpButton>
))
FormSelectScrollUpButton.displayName =
  SelectPrimitive.ScrollUpButton.displayName

const FormSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronDown className='h-4 w-4' />
  </SelectPrimitive.ScrollDownButton>
))
FormSelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const FormSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        `relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover
        text-popover-foreground shadow-md data-[state=open]:animate-in
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
        data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2
        data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
        data-[side=top]:slide-in-from-bottom-2`,
        position === 'popper' &&
          `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1
          data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1`,
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            `h-[var(--radix-select-trigger-height)] w-full
            min-w-[var(--radix-select-trigger-width)]`,
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
FormSelectContent.displayName = SelectPrimitive.Content.displayName

const FormSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))
FormSelectLabel.displayName = SelectPrimitive.Label.displayName

const FormSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      `relative flex w-full cursor-default select-none items-center rounded-sm py-1.5
      pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground
      data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
      className,
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <SelectPrimitive.ItemIndicator>
        <Check className='h-4 w-4' />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
FormSelectItem.displayName = SelectPrimitive.Item.displayName

const FormSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
FormSelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  FormSelect,
  FormSelectGroup,
  FormSelectValue,
  FormSelectTrigger,
  FormSelectContent,
  FormSelectLabel,
  FormSelectItem,
  FormSelectSeparator,
  FormSelectScrollUpButton,
  FormSelectScrollDownButton,
}