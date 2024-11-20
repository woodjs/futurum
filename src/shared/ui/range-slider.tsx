'use client'

import { Fragment, useEffect, useState, forwardRef } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/shared/lib/utils'
import { FormInput } from './form-input'

export type SliderProps = {
  className?: string
  min: number
  max: number
  minStepsBetweenThumbs: number
  step: number
  formatLabel?: (value: number) => string
  value?: number[] | readonly number[]
  onValueChange?: (values: number[]) => void
  onInputValueChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
}

const RangeSlider = forwardRef(
  (
    {
      className,
      min,
      max,
      step,
      formatLabel,
      value,
      onValueChange,
      onInputValueChange,
      ...props
    }: SliderProps,
    ref,
  ) => {
    const initialValue = Array.isArray(value) ? value : [min, max]
    const [localValues, setLocalValues] = useState(initialValue)

    useEffect(() => {
      // Update localValues when the external value prop changes
      setLocalValues(Array.isArray(value) ? value : [min, max])
    }, [min, max, value])

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues)
      if (onValueChange) {
        onValueChange(newValues)
      }
    }

    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number,
    ) => {
      const target = event.target as HTMLInputElement
      const value = target.value || '0'

      if (/^(\s*|\d+)$/.test(value)) {
        const newLocalValues = [...localValues]
        newLocalValues[index] = Number(value)
        setLocalValues([...newLocalValues])
      }

      if (onInputValueChange) {
        onInputValueChange(event, index)
      }
    }

    return (
      <div className='flex w-full max-w-[300px] flex-col items-center gap-y-[30px]'>
        <div className='flex w-full items-center justify-between'>
          {localValues.map((value, index) => (
            <Fragment key={index}>
              <FormInput
                type='text'
                className='w-[130px]'
                value={value}
                onChange={event => handleInputChange(event, index)}
              />
              {index < localValues.length - 1 ? (
                <div className='h-[1px] w-[10px] bg-transparent-gray' />
              ) : null}
            </Fragment>
          ))}
        </div>
        <SliderPrimitive.Root
          ref={ref as React.RefObject<HTMLDivElement>}
          min={min}
          max={max}
          step={step}
          value={localValues}
          onValueChange={handleValueChange}
          className={cn(
            'relative mb-6 flex w-full touch-none select-none items-center',
            className,
          )}
          {...props}
        >
          <SliderPrimitive.Track className='relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20'>
            <SliderPrimitive.Range className='absolute h-full bg-primary' />
          </SliderPrimitive.Track>
          {localValues.map((value, index) => (
            <Fragment key={index}>
              <SliderPrimitive.Thumb
                className='block h-3 w-3 rounded-full border border-primary/50 bg-background shadow
                  transition-colors focus-visible:outline-none focus-visible:ring-1
                  focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
              >
                {' '}
                <div
                  className='absolute -bottom-8 left-1/2 z-30 -translate-x-1/2 transform rounded-md border
                    bg-popover px-2 text-popover-foreground shadow-sm'
                >
                  {formatLabel ? formatLabel(value) : value}
                </div>
              </SliderPrimitive.Thumb>
            </Fragment>
          ))}
        </SliderPrimitive.Root>
      </div>
    )
  },
)

RangeSlider.displayName = SliderPrimitive.Root.displayName

export { RangeSlider }
