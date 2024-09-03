import { Dialog, DialogContent } from '@/shared/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Input } from '@/shared/ui'
import { FormInput } from '@/shared/ui/form-input'
import {
  FormSelect,
  FormSelectContent,
  FormSelectItem,
  FormSelectTrigger,
  FormSelectValue,
} from '@/shared/ui/form-select'

const formSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(1, 'Username is required'),
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required'),
})

export const LoginDialog = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <Form {...form}>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <FormInput placeholder='Enter your username' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <FormSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <FormSelectTrigger>
                        <FormSelectValue placeholder='Select a verified email to display' />
                      </FormSelectTrigger>
                    </FormControl>
                    <FormSelectContent>
                      <FormSelectItem value='m@example.com'>
                        m@example.com
                      </FormSelectItem>
                      <FormSelectItem value='m@google.com'>
                        m@google.com
                      </FormSelectItem>
                      <FormSelectItem value='m@support.com'>
                        m@support.com
                      </FormSelectItem>
                    </FormSelectContent>
                  </FormSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button onClick={form.handleSubmit(console.log)} type='submit'>
            Login
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
