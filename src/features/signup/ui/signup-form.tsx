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
  const validationT = useTranslations('validation')
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

    if (email && password && firstName && lastName) {
      await protectedAPI
        .post(AUTH_SIGN_UP, {
          ...formData,
        })
        .then(res => {
          Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(res.data))

          router.push('/')
        })
        .catch(error => {
          enqueueSnackbar(authT('authError'), {
            variant: 'error',
            persist: true,
          })
        })
    }
  }

  const handleFormUpdate = (data: IFormData) => {
    const { email, password, firstName, lastName } = data
    setFormData({ ...formData, email, password, firstName, lastName })
  }

  return (
    <div className='flex h-[100vh] w-full items-center bg-[#E2E8F0]'>
      <div className='m-auto flex flex-col items-center rounded-[20px] bg-white px-[76.5px] py-[48px]'>
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
                .min(8, { message: validationT('charactersMin') })
                .max(20, { message: validationT('charactersMax') })
                .refine(password => /[A-Z]/.test(password), {
                  message: validationT('uppercase'),
                })
                .refine(password => /[a-z]/.test(password), {
                  message: validationT('lowercase'),
                })
                .refine(password => /[0-9]/.test(password), {
                  message: validationT('numbers'),
                })
                .refine(password => /[!@#$%^&*]/.test(password), {
                  message: validationT('specialCharacters'),
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
                onClick={form.handleSubmit(async () => {
                  await handleSignUp()
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
