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
import { z } from 'zod'

interface IFormData {
  email?: string | null
  password?: string | null
}

const AUTH_TOKEN_KEY = 'auth-token-data'

export const LoginForm = () => {
  const signInT = useTranslations('default.Auth.SignIn')
  const authT = useTranslations('auth')
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
          Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(res.data))

          router.push('/')
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser
            // and an instance of http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
          }
          enqueueSnackbar(authT('authError'), {
            variant: 'error',
            persist: true,
          })
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
