'use client'

import { DynamicForm } from '@/shared/ui/dynamic-form'
import { NormalButton } from '@/shared/ui/normal-button'
import { GradientTypography } from '../../../shared/ui'
import { useTranslations } from 'next-intl'
import { AUTH_SIGN_UP } from '../../../shared/api/config'
import HTTP_CODES_ENUM from '@/shared/api/types/http-codes'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { protectedAPI } from '../../../shared/api'
import { useRouter } from '../../../i18n/routing'
import { useSnackbar } from 'notistack'

const AUTH_TOKEN_KEY = 'auth-token-data'

interface IFormData {
  email?: string | null
  password?: string | null
  firstName?: string | null
  lastName?: string | null
  info?: any
}

export const SignUpForm = () => {
  const t = useTranslations('default.Auth.SignUp')
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [formData, setFormData] = useState<IFormData>({
    email: null,
    password: null,
    firstName: null,
    lastName: null,
  })

  const router = useRouter()

  const handleSignUp = async () => {
    const { email, password, firstName, lastName } = formData

    if (email && password && firstName && lastName) {
      await protectedAPI
        .post(AUTH_SIGN_UP, {
          ...formData,
        })
        .then(res => {
          if (res.status === HTTP_CODES_ENUM.OK) {
            Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(res.data))

            router.push('/')
          }
        })
        .catch(error => {
          enqueueSnackbar('Sign up error')
        })
    }
  }

  const handleFormUpdate = (data: IFormData) => {
    const { email, password, firstName, lastName } = data
    setFormData({ ...formData, email, password, firstName, lastName })
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
              type: 'email',
              label: 'Email',
              placeholder: 'Enter your email',
            },
            password: {
              type: 'password',
              label: 'Password',
              placeholder: 'Enter your password',
            },
            firstName: {
              type: 'text',
              label: 'First Name',
              placeholder: 'Enter your first name',
            },
            lastName: {
              type: 'text',
              label: 'Last Name',
              placeholder: 'Enter your last name',
            },
          }}
          onFormUpdate={data => handleFormUpdate(data)}
          renderFooter={form => (
            <div className='flex justify-end'>
              <NormalButton
                onClick={form.handleSubmit(() => {
                  handleSignUp()
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
