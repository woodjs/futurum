'use client'
import { useFormContext } from 'react-hook-form'
import { descriptionFormSchema } from '@/entities/organization'
import { z } from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import Editor from '@/shared/ui/editor'

type DescriptionValues = z.infer<typeof descriptionFormSchema>

const Description = () => {
  const { control } = useFormContext<DescriptionValues>()
  return (
    <div className='grid gap-4'>
      <FormField
        control={control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Страна</FormLabel>
            <FormControl>
              <Editor
                className='min-h-[300px]'
                placeholder='Опишите свою организацию...'
                content={field.value || ''}
                onContentChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default Description
