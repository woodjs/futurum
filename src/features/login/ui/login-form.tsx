'use client'

import { DynamicForm } from '@/shared/ui/dynamic-form'
import { NormalButton } from '@/shared/ui/normal-button'
import { GradientTypography } from '../../../shared/ui'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '../../../i18n/routing'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { protectedAPI } from '../../../shared/api'
import { AUTH_SIGN_IN } from '../../../shared/api/config'
import { z } from 'zod'
import { errorClientHandler } from '../../../shared/api/helpers/auth.helper'

interface IFormData {
  email?: string | null
  password?: string | null
}

const AUTH_TOKEN_KEY = 'auth-token-data'

export const LoginForm = () => {
  const signInT = useTranslations('default.Auth.SignIn')
  const authT = useTranslations('auth')
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
          Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(res.data))

          router.push('/profile')
        })
        .catch(error => {
<<<<<<< HEAD
          errorClientHandler(error?.errors)
=======
          enqueueSnackbar(authT('authError'), {
            variant: 'error',
            persist: true,
          })
>>>>>>> development
        })
    }
  }

  const handleFormUpdate = (data: IFormData) => {
    const { email, password } = data
    setFormData({ ...formData, email, password })
  }

  return (
    <div className='flex h-[100vh] w-full items-center bg-[#E2E8F0]'>
      <div className='m-auto flex flex-col items-center rounded-[20px] bg-white px-[76.5px] py-[48px]'>
        <GradientTypography className='pb-[16px] text-center'>
          {signInT('title')}
        </GradientTypography>
        <DynamicForm
          classNames={{ form: 'w-full' }}
          useFormProps={{
            reValidateMode: 'onChange',
            defaultValues: { ...formData },
          }}
          fields={{
            email: {
              type: 'text',
              label: authT('email'),
              placeholder: authT('enterEmail'),
              validation: z.string().email().min(5),
            },
            password: {
              type: 'password',
              label: authT('password'),
              placeholder: authT('enterPassword'),
            },
          }}
          onFormUpdate={data => handleFormUpdate(data)}
          renderFooter={form => (
            <div className='flex justify-end gap-2'>
              <Link
                href='/auth/signup'
                className='m-0 flex self-center p-0 transition-colors hover:text-blue-400'
              >
                {authT('accountDoesNotExist')}
              </Link>
              <NormalButton onClick={form.handleSubmit(() => handleSignIn())}>
                {authT('signIn')}
              </NormalButton>
            </div>
          )}
        />
      </div>
    </div>
  )
}
