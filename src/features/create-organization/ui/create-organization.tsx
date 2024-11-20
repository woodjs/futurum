'use client'
import {
  businessStepper,
  charityStepper,
  CreateCompanyCard,
  FailedOrganizationView,
  IOrganization,
  OrganizationType,
  startupStepper,
  SuccessOrganizationView,
} from '@/entities/organization'
import { useState } from 'react'
import { mainStepper } from '@/entities/organization'
import { CreateBusinessForm } from './create-business-form'
import { CreateFormWrapper } from './create-form-wrapper'
import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { getFakeOrganizationData } from '@/entities/organization/lib/get-fake-business-data'

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
  const [organization, setOrganization] = useState<IOrganization>()
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
          // <FailedOrganizationView back={() => stepper.goTo('create')} />
          // <SuccessOrganizationView organization={getFakeOrganizationData()} />
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
            onSuccess={(organization: IOrganization) => {
              if (!organization) return router.push('/profile/organizations')
              setOrganization(organization)
              stepper.goTo('success')
              // router.push('/profile/organizations')
            }}
            onReject={() => {
              stepper.goTo('failed')
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
        success: () =>
          organization && (
            <SuccessOrganizationView organization={organization} />
          ),
        failed: () => (
          <FailedOrganizationView back={() => stepper.goTo('create')} />
        ),
      })}
    </>
  )
}

export default CreateOrganizationForm
