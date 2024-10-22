'use client'
import { DynamicForm } from '../../shared/ui/dynamic-form'
import Section from '../../screens/main/section'
import { z } from 'zod'
import { MilestoneProgress } from '../../shared/ui/milestone-progress'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
// import { useUser } from '../../entities/user'
import Loader from '../../shared/ui/loader'
import { userInfoToProgress } from './helpers/userInfoToProgress'
import { userToForm } from './helpers/userToForm'
import { Button } from '../../shared/ui'
import { protectedAPI } from '../../shared/api'
// import { AUTH_ME_URL } from '../../shared/api/config'
import FileUpload from '../../shared/ui/file-upload'
import { useProfile } from '../../entities/profile/hooks'
import { useMutation } from '@tanstack/react-query'
import { profileKeysEnum } from '../../entities/profile/model'
import { useSnackbar } from 'notistack'

interface IUserInfoFormData {
  email?: string
  firstName?: string
  lastName?: string
  login?: string | null
  country?: string | null
  whatsapp?: string | null
  phone?: string | null
  telegram?: string | null
}

interface IPasswordFormData {
  password?: string
  oldPassword?: string
  confirm?: string
}

interface IFile {
  id: string
  name: string
  type: string
  url: string
}

const UserInfoForm = () => {
  const t = useTranslations('profile')
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { user, isLoading } = useProfile()
  const [progress, setProgress] = useState(0)
  const [checked, setChecked] = useState(false)
  const [formData, setFormData] = useState(userToForm({ ...user }))
  const [avatar, setAvatar] = useState<IFile[]>([])
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    password: '',
    confirm: '',
  })

  const imageAccept = 'image/png, image/jpeg, image/jpg'

  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
  )

  useEffect(() => {
    const newProgress = userInfoToProgress(user)

    setProgress(newProgress)
  }, [user])

  const handleFormChange = (data: IUserInfoFormData) => {
    setFormData({ ...formData, ...data })
  }

  const handlePasswordChange = (data: IPasswordFormData) => {
    setPasswords({ ...passwords, ...data })

    console.log(passwords, 'Passwords')
  }

  const handleFormSubmit = async () => {
    let finilizedData = { ...formData }
    if (avatar.length) {
      finilizedData = {
        ...formData,
        photo: {
          id: avatar[0].id,
        },
      }
    }
    await protectedAPI.patch('/v1/profile', {
      ...finilizedData,
    })
  }

  const handlePasswordFormSubmit = async () => {
    await protectedAPI.patch(`/v1/profile/password`, passwords)
  }

  const handleFileUpload = (file: IFile[]) => {
    setAvatar([...file])
  }

  const mutation = useMutation({
    mutationFn: handleFormSubmit,
    mutationKey: profileKeysEnum.PROFILE_GET_KEY,
    onSuccess: () => {
      enqueueSnackbar('Profile information updated!')
    },
  })

  return (
    <Section className='gap-[32px]'>
      <MilestoneProgress progressValue={progress} checked={checked} />
      <div>
        <h5 className='text-bold mb-[18px] text-[18px]'>
          {t('userInformation')}
        </h5>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <FileUpload
              name='logo'
              label='Upload Avatar'
              accept={imageAccept}
              multiple={false}
              maxFiles={1}
              required={false}
              value={avatar}
              onChange={handleFileUpload}
              error='test'
            />
            <DynamicForm
              useFormProps={{
                defaultValues: userToForm({ ...user }),
                reValidateMode: 'onChange',
              }}
              onFormUpdate={data => handleFormChange(data)}
              classNames={{
                form: 'rounded-[15px] bg-[#F8F9FB] px-[14.5px] py-[16px]',
              }}
              fields={{
                login: {
                  type: 'text',
                  label: 'Login',
                  placeholder: 'Enter your login',
                  validation: z.string(),
                },
                email: {
                  type: 'email',
                  label: 'Email',
                  placeholder: 'Enter your email',
                  validation: z.string().email().min(5),
                },
                firstName: {
                  type: 'text',
                  label: 'Name',
                  placeholder: 'Enter your first name',
                  validation: z.string(),
                },
                lastName: {
                  type: 'text',
                  label: 'Last Name',
                  placeholder: 'Enter your last name(or first letter)',
                  validation: z.string(),
                },
                country: {
                  type: 'text',
                  label: 'Country',
                  placeholder: 'Enter your country',
                  validation: z.string(),
                },
                phone: {
                  type: 'text',
                  label: 'Phone',
                  placeholder: 'Enter your phone number',
                  validation: z.string().regex(phoneRegex, 'Invalid Number!'),
                },
                whatsapp: {
                  type: 'text',
                  label: 'Whatsapp',
                  placeholder: 'Enter your Whatsapp',
                  validation: z.string(),
                },
                telegram: {
                  type: 'text',
                  label: 'Telegram',
                  placeholder: 'Enter your Telegram',
                  validation: z.string(),
                },
                about: {
                  type: 'richText',
                  label: 'About',
                  placeholder: 'Tell about yourself',
                  validation: z.string(),
                },
              }}
              renderFooter={() => (
                <Button
                  variant='outline'
                  className='max-w-[214px]'
                  onClick={() => {
                    mutation.mutate()
                  }}
                >
                  {t('saveChanges')}
                </Button>
              )}
            />

            <DynamicForm
              useFormProps={{
                defaultValues: passwords,
                reValidateMode: 'onChange',
              }}
              onFormUpdate={data => handlePasswordChange(data)}
              classNames={{
                form: 'rounded-[15px] bg-[#F8F9FB] px-[14.5px] py-[16px] mt-[32px]',
              }}
              refine={() => (
                data => data.password === data.confirmPassword,
                {
                  message: "Passwords don't match",
                  path: ['confirmPassword'],
                }
              )}
              fields={{
                oldPassword: {
                  type: 'password',
                  label: 'Current Password',
                  placeholder: '************',
                  validation: z.string(),
                },
                password: {
                  type: 'password',
                  label: 'New Password',
                  placeholder: '**************',
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
                confirm: {
                  type: 'password',
                  label: 'Confirm Password',
                  placeholder: '************',
                  validation: z.string(),
                },
              }}
              renderFooter={() => (
                <Button
                  variant='secondary'
                  className='max-w-[214px]'
                  onClick={handlePasswordFormSubmit}
                >
                  {t('saveChanges')}
                </Button>
              )}
            />
          </>
        )}
      </div>
    </Section>
  )
}

export default UserInfoForm
