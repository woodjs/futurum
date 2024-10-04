'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DynamicForm } from '@/shared/ui/dynamic-form'
import { NormalButton } from '@/shared/ui/normal-button'
import { GradientTypography } from '../../../shared/ui'
import { useTranslations } from 'next-intl'

export const SignUpForm = () => {
  const t = useTranslations('Auth.SignUp')

  const queryClient = useQueryClient()

  interface ITest {
    id: string
    title: string
  }

  const getTodos = async () => {}
  const postTodo = async () => {}

  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <div className='flex h-[100vh] w-full items-center bg-[#E2E8F0]'>
      {/* <ul>{query.data?.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul> */}
      <div
        className='m-auto flex w-full max-w-[560px] flex-col items-center rounded-[20px] bg-white
          px-[76.5px] py-[48px]'
      >
        <GradientTypography className='pb-[16px] text-center'>
          {t('title')}
        </GradientTypography>
        <DynamicForm
          classNames={{ form: 'w-full' }}
          fields={{
            username: {
              type: 'text',
              label: 'Username',
              placeholder: 'Enter your username',
            },
            password: {
              type: 'password',
              label: 'Password',
              placeholder: 'Enter your password',
            },
            passwordRepeat: {
              type: 'password',
              label: 'Repeat Password',
              placeholder: 'Enter your password again',
            },
          }}
          renderFooter={form => (
            <div className='flex justify-end'>
              <NormalButton
                onClick={form.handleSubmit(() => {
                  mutation.mutate({
                    id: 'test',
                    title: 'Do Laundry',
                  })
                })}
              >
                Sign Up
              </NormalButton>
            </div>
          )}
        />
      </div>
    </div>
  )
}
