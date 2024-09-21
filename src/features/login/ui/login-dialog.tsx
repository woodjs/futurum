'use client'
import { Dialog, DialogContent } from '@/shared/ui/dialog'
import { DynamicForm } from '@/shared/ui/dynamic-form'
import { NormalButton } from '@/shared/ui/normal-button'

export const LoginDialog = () => {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DynamicForm
          fields={{
            username: {
              type: 'input',
              label: 'Username',
              placeholder: 'Enter your username',
            },
            email: {
              type: 'input',
              label: 'Email',
              placeholder: 'Enter your email',
            },
          }}
          renderFooter={form => (
            <div className='flex justify-end'>
              <NormalButton
                onClick={form.handleSubmit(data => console.log(data))}
              >
                Login
              </NormalButton>
            </div>
          )}
        />
        {/* <Form {...form}>
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
        </Form> */}
      </DialogContent>
    </Dialog>
  )
}
