'use client'
import {
  businessStepper,
  charityStepper,
  CreateCompanyCard,
  OrganizationType,
  startupStepper,
} from '@/entities/organization'
import { useState } from 'react'
import { mainStepper } from '@/entities/organization'
import { CreateBusinessForm } from './create-business-form'
import { CreateFormWrapper } from './create-form-wrapper'
import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

const fakeCards = [
  {
    title: 'organization.types.business',
    image: '/images/svg/Hand_drawn_businessman.svg',
    link: '/profile/organizations/create/business',
    id: OrganizationType.BUSINESS,
  },
  {
    title: 'organization.types.startup',
    image: '/images/svg/light_bulbs_curly_lines.svg',
    link: '/profile/organizations/create/startup',
    id: OrganizationType.STARTUP,
  },
  {
    title: 'organization.types.charity',
    image: '/images/svg/Thin_Line_Calligraphy_Heart_2.svg',
    link: '/profile/organizations/create/charity',
    id: OrganizationType.CHARITY,
  },
]

const { useStepper } = mainStepper

const CreateOrganizationForm = () => {
  const stepper = useStepper()
  const router = useRouter()
  const businessStepperInstance = businessStepper.useStepper()
  const charityStepperInstance = charityStepper.useStepper()
  const startupStepperInstance = startupStepper.useStepper()

  const t = useTranslations()
  const [selectedType, setSelectedType] = useState<OrganizationType>()

  return (
    <>
      {stepper.switch({
        type: () => (
          <div>
            <div className='my-8 text-center text-xl text-black'>
              {t('organization.form.stepper.mainStepper.typeSelection')}
            </div>
            <div className='mb-6 grid grid-cols-1 gap-8 lg:grid-cols-3'>
              {fakeCards.map(card => (
                <CreateCompanyCard
                  onClick={() => {
                    setSelectedType(card.id)
                    stepper.next()
                  }}
                  key={card.title}
                  {...card}
                  title={t(card.title)}
                />
              ))}
            </div>
          </div>
        ),

        create: () => (
          <CreateFormWrapper
            type={selectedType as OrganizationType}
            onBack={() => stepper.prev()}
            onSuccess={() => {
              router.push('/profile/organizations')
            }}
            onReject={() => {
              // setSelectedType(undefined)
              // stepper.reset()
            }}
            stepper={
              selectedType === OrganizationType.BUSINESS
                ? businessStepperInstance
                : selectedType === OrganizationType.CHARITY
                  ? charityStepperInstance
                  : startupStepperInstance
            }
            steps={
              selectedType === OrganizationType.BUSINESS
                ? businessStepper.steps
                : selectedType === OrganizationType.CHARITY
                  ? charityStepper.steps
                  : startupStepper.steps
            }
          />
        ),
        success: () => (
          <div>{t('organization.form.stepper.mainStepper.success')}</div>
        ),
      })}
    </>
  )
}

export default CreateOrganizationForm
