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
  const validationT = useTranslations('validation')
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { user, isLoading } = useProfile()
  const [progress, setProgress] = useState(0)
  const [checked, setChecked] = useState(false)
  const [formData, setFormData] = useState(userToForm({ ...user }))
  const [avatar, setAvatar] = useState<IFile[]>([])
  const [avatarError, setAvatarError] = useState(undefined)
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
    <Section className='mt-[32px] gap-[32px]'>
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
              label={t('uploadAvatar')}
              accept={imageAccept}
              multiple={false}
              maxFiles={1}
              required={false}
              value={avatar}
              onChange={handleFileUpload}
              error={avatarError}
            />
            <div className='pt-4'></div>
            <DynamicForm
              useFormProps={{
                defaultValues: userToForm({ ...user }),
              }}
              onFormUpdate={data => handleFormChange(data)}
              classNames={{
                form: 'rounded-[15px] bg-[#F8F9FB] px-[14.5px] py-[16px]',
              }}
              fields={{
                login: {
                  type: 'text',
                  label: t('login'),
                  placeholder: t('enterLogin'),
                  validation: z.string(),
                },
                email: {
                  type: 'email',
                  label: t('email'),
                  placeholder: t('enterEmail'),
                  validation: z.string().email().min(5),
                },
                firstName: {
                  type: 'text',
                  label: t('firstName'),
                  placeholder: t('enterFirstName'),
                  validation: z.string(),
                },
                lastName: {
                  type: 'text',
                  label: t('lastName'),
                  placeholder: t('enterLastName'),
                  validation: z.string(),
                },
                country: {
                  type: 'text',
                  label: t('country'),
                  placeholder: t('enterCountry'),
                  validation: z.string(),
                },
                phone: {
                  type: 'text',
                  label: t('phone'),
                  placeholder: t('enterPhone'),
                  validation: z.string().regex(phoneRegex, 'Invalid Number!'),
                },
                whatsapp: {
                  type: 'text',
                  label: 'Whatsapp',
                  placeholder: t('enterWhatsapp'),
                  validation: z.string(),
                },
                telegram: {
                  type: 'text',
                  label: 'Telegram',
                  placeholder: t('enterTelegram'),
                  validation: z.string(),
                },
                about: {
                  type: 'richText',
                  label: t('about'),
                  placeholder: t('tellAbout'),
                  validation: z.string(),
                },
              }}
              renderFooter={form => (
                <Button
                  variant='outline'
                  className='max-w-[230px]'
                  onClick={form.handleSubmit(() => mutation.mutate())}
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
                  label: t('currentPassword'),
                  placeholder: '************',
                  validation: z.string(),
                },
                password: {
                  type: 'password',
                  label: t('newPassword'),
                  placeholder: '**************',
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
                confirm: {
                  type: 'password',
                  label: t('confirmPassword'),
                  placeholder: '************',
                  validation: z.string(),
                },
              }}
              renderFooter={form => (
                <Button
                  variant='secondary'
                  className='max-w-[230px]'
                  onClick={form.handleSubmit(() => handlePasswordFormSubmit())}
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
