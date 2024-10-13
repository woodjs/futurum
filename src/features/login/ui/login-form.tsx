'use client'

import { DynamicForm } from '@/shared/ui/dynamic-form'
import { NormalButton } from '@/shared/ui/normal-button'
import { GradientTypography } from '../../../shared/ui'
import { useTranslations } from 'next-intl'
import useFetchBase from '../../../shared/api/use-fetch-base'
import { useQuery } from '@tanstack/react-query'
import { Link } from '../../../i18n/routing'

export const LoginForm = () => {
  const t = useTranslations('Auth.SignIn')
  const fetchBase = useFetchBase()
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetchBase('https://api.github.com/repos/TanStack/query').then(res => res),
  })

  return (
    <div className='flex h-[100vh] w-full items-center bg-[#E2E8F0]'>
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
            email: {
              type: 'password',
              label: 'Password',
              placeholder: 'Enter your password',
            },
          }}
          renderFooter={form => (
            <div className='flex justify-end gap-2'>
              <Link
                href='/auth/signup'
                className='m-0 flex self-center p-0 transition-colors hover:text-blue-400'
              >
                Don't have an account?
              </Link>
              <NormalButton
                onClick={form.handleSubmit(data => console.log(data))}
              >
                Login
              </NormalButton>
            </div>
          )}
        />
      </div>
    </div>
  )
}
