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
import { Link, useRouter } from '../../../i18n/routing'
import { useSnackbar } from 'notistack'
import { z } from 'zod'

const AUTH_TOKEN_KEY = 'auth-token-data'

interface IFormData {
  email?: string | null
  password?: string | null
  firstName?: string | null
  lastName?: string | null
  info?: any
}

export const SignUpForm = () => {
  const signUpT = useTranslations('default.Auth.SignUp')
  const authT = useTranslations('auth')
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  const router = useRouter()

  const handleSignUp = async () => {
    const { email, password, firstName, lastName } = formData

    console.log(formData)
    if (email && password && firstName && lastName) {
      await protectedAPI
        .post(AUTH_SIGN_UP, {
          ...formData,
        })
        .then(res => {
          if (res.status === HTTP_CODES_ENUM.OK) {
            Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(res.data))

            router.push('/')
          } else {
            enqueueSnackbar(authT('authError'), {
              variant: 'error',
              persist: true,
            })
          }
        })
        .catch(error => {
          enqueueSnackbar(authT('authError'))
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
        className='m-auto flex w-full max-w-[600px] flex-col items-center rounded-[20px] bg-white
          px-[76.5px] py-[48px]'
      >
        <GradientTypography className='pb-[16px] text-center'>
          {signUpT('title')}
        </GradientTypography>
        <DynamicForm
          classNames={{ form: 'w-full' }}
          useFormProps={{
            defaultValues: { ...formData },
          }}
          fields={{
            email: {
              type: 'email',
              label: authT('email'),
              placeholder: authT('enterEmail'),
              validation: z.string().email().min(5),
            },
            password: {
              type: 'password',
              label: authT('password'),
              placeholder: authT('enterPassword'),
              validation: z
                .string()
                .min(8, { message: '8 characters minimum' })
                .max(20, { message: '20 characters max' })
                .refine(password => /[A-Z]/.test(password), {
                  message: 'Uppercase symbols required',
                })
                .refine(password => /[a-z]/.test(password), {
                  message: 'Lowercase symbols required',
                })
                .refine(password => /[0-9]/.test(password), {
                  message: 'Numbers required',
                })
                .refine(password => /[!@#$%^&*]/.test(password), {
                  message: 'Special characters required',
                }),
            },
            firstName: {
              type: 'text',
              label: authT('firstName'),
              placeholder: authT('enterFirstName'),
              validation: z.string(),
            },
            lastName: {
              type: 'text',
              label: authT('lastName'),
              placeholder: authT('enterLastName'),
              validation: z.string(),
            },
          }}
          onFormUpdate={data => handleFormUpdate(data)}
          renderFooter={form => (
            <div className='flex justify-end gap-2'>
              <Link
                href='/auth/signin'
                className='m-0 flex self-center p-0 transition-colors hover:text-blue-400'
              >
                {authT('accountExists')}
              </Link>
              <NormalButton
                onClick={form.handleSubmit(() => {
                  handleSignUp()
                })}
              >
                {authT('signUp')}
              </NormalButton>
            </div>
          )}
        />
      </div>
    </div>
  )
}
