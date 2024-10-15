'use client'

import { DynamicForm } from '@/shared/ui/dynamic-form'
import { NormalButton } from '@/shared/ui/normal-button'
import { GradientTypography } from '../../../shared/ui'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '../../../i18n/routing'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { protectedAPI } from '../../../shared/api'
import { AUTH_SIGN_IN } from '../../../shared/api/config'
import HTTP_CODES_ENUM from '../../../shared/api/types/http-codes'

interface IFormData {
  email?: string | null
  password?: string | null
}

const AUTH_TOKEN_KEY = 'auth-token-data'

export const LoginForm = () => {
  const t = useTranslations('default.Auth.SignIn')
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [formData, setFormData] = useState<IFormData>({
    email: null,
    password: null,
  })

  const router = useRouter()

  const handleSignIn = async () => {
    const { email, password } = formData

    if (email && password) {
      await protectedAPI
        .post(AUTH_SIGN_IN, {
          ...formData,
        })
        .then(res => {
          if (res.status === HTTP_CODES_ENUM.OK) {
            Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(res.data))

            router.push('/')
          }
        })
        .catch(error => {
          enqueueSnackbar('Sign in error')
        })
    }
  }

  const handleFormUpdate = (data: IFormData) => {
    const { email, password } = data
    setFormData({ ...formData, email, password })
  }

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
            email: {
              type: 'text',
              label: 'Email',
              placeholder: 'Enter your email',
            },
            password: {
              type: 'password',
              label: 'Password',
              placeholder: 'Enter your password',
            },
          }}
          onFormUpdate={data => handleFormUpdate(data)}
          renderFooter={form => (
            <div className='flex justify-end gap-2'>
              <Link
                href='/auth/signup'
                className='m-0 flex self-center p-0 transition-colors hover:text-blue-400'
              >
                Don't have an account?
              </Link>
              <NormalButton onClick={form.handleSubmit(() => handleSignIn())}>
                Login
              </NormalButton>
            </div>
          )}
        />
      </div>
    </div>
  )
}
