'use client'

import { DynamicForm } from '@/shared/ui/dynamic-form'
import { NormalButton } from '@/shared/ui/normal-button'
import { GradientTypography } from '../../../shared/ui'
import { useTranslations } from 'next-intl'

export const LoginForm = () => {
  const t = useTranslations('Auth.SignIn')

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
              type: 'email',
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
      </div>
    </div>
  )
}
