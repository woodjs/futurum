'use client'

import { DynamicForm } from '@/shared/ui/dynamic-form'
import { NormalButton } from '@/shared/ui/normal-button'
import { GradientTypography } from '../../../shared/ui'
import { useTranslations } from 'next-intl'
import useFetchBase from '../../../shared/api/use-fetch-base'
import { AUTH_SIGN_UP } from '../../../shared/api/config'
import { useState } from 'react'

interface IFormData {
  email?: string | null
  password?: string | null
  firstName?: string | null
  lastName?: string | null
  info?: any
}

export const SignUpForm = () => {
  const t = useTranslations('Auth.SignUp')
  const [formData, setFormData] = useState<IFormData>({
    email: null,
    password: null,
    firstName: null,
    lastName: null,
  })

  const fetchBase = useFetchBase()

  const handleSignUp = async () => {
    const { email, password, firstName, lastName } = formData

    if (email && password && firstName && lastName) {
      await fetchBase(AUTH_SIGN_UP, {
        body: {
          ...formData,
        },
      }).then(res => {
        console.log(res)
      })
    }
  }

  const handleFormUpdate = (data: IFormData) => {
    const { email, password, firstName, lastName } = data
    setFormData({ ...formData, email, password, firstName, lastName })

    console.log(formData)
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
