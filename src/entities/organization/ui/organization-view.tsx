'use client'
import { FC, use } from 'react'
import {
  IBusinessOrganization,
  IOrganization,
  OrganizationType,
} from '../model'
import Image from 'next/image'
import SocialList from './social-list'
import { EmployeesView } from './employees-view'
import { FinancialView } from './fincial-view'
import { DocumentsView } from './documents-view'
import { Globe, Globe2 } from 'lucide-react'
import DescriptionView from './description-view'
import LogoView from './logo-view'
import MainInfoView from './main-info-view'
import StartPageView from './start-page-view'
import EmptyView from './empty'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

interface IEditProps {
  id: string
}

interface IOrganizationViewProps {
  organization: IOrganization
  logoEdit?: FC<IEditProps>
  mainInfoEdit?: FC<IEditProps>
  descriptionEdit?: FC<IEditProps>
  socialMediaEdit?: FC<IEditProps>
  financialInfoEdit?: FC<IEditProps>
  employeesEdit?: FC<IEditProps>
  documentsEdit?: FC<IEditProps>
  startPageEdit?: FC<IEditProps>
}

const OrganizationView: FC<IOrganizationViewProps> = ({
  organization,
  logoEdit,
  mainInfoEdit,
  descriptionEdit,
  socialMediaEdit,
  financialInfoEdit,
  employeesEdit,
  documentsEdit,
  startPageEdit,
}) => {
  const {
    logo,
    companyName,
    ownershipForm,
    positionInCompany,
    country,
    city,
    address,
    description,
    socialMedia,
    employees,
    documents,
    verified,
  } = organization

  const t = useTranslations()

  return (
    <div className='w-full space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-black'>
      {logo && <LogoView id={organization.id} logo={logo} edit={logoEdit} />}
      <MainInfoView
        id={organization.id}
        edit={mainInfoEdit}
        address={address}
        city={city}
        companyName={companyName}
        country={country}
        ownershipForm={ownershipForm}
        positionInCompany={positionInCompany}
        verified={verified}
      />
      {description ? (
        <DescriptionView
          id={organization.id}
          edit={descriptionEdit}
          description={description}
        />
      ) : descriptionEdit ? (
        <EmptyView
          id={organization.id}
          edit={descriptionEdit}
          title={t('organization.view.description')}
        />
      ) : null}
      {socialMedia ? (
        <SocialList
          id={organization.id}
          edit={socialMediaEdit}
          links={socialMedia}
        />
      ) : socialMediaEdit ? (
        <EmptyView
          id={organization.id}
          edit={socialMediaEdit}
          title={t('organization.view.socialNetworks')}
        />
      ) : null}
      {organization.type === OrganizationType.STARTUP &&
        (organization.fundingInfo ? (
          <StartPageView
            id={organization.id}
            edit={startPageEdit}
            fundingInfo={organization.fundingInfo}
          />
        ) : (
          startPageEdit && (
            <EmptyView
              id={organization.id}
              edit={startPageEdit}
              title={t('organization.view.startPage')}
            />
          )
        ))}
      {organization.type === OrganizationType.BUSINESS &&
        (organization.financialInfo ? (
          <FinancialView
            id={organization.id}
            edit={financialInfoEdit}
            {...organization.financialInfo}
          />
        ) : (
          financialInfoEdit && (
            <EmptyView
              id={organization.id}
              edit={financialInfoEdit}
              title={t('organization.view.financialIndicators')}
            />
          )
        ))}
      {employees && !!employees.length ? (
        <EmployeesView
          id={organization.id}
          edit={employeesEdit}
          employees={employees}
        />
      ) : (
        employeesEdit && (
          <EmptyView
            id={organization.id}
            edit={employeesEdit}
            title={t('organization.view.employees')}
          />
        )
      )}
      {documents ? (
        <DocumentsView
          id={organization.id}
          edit={documentsEdit}
          {...documents}
        />
      ) : (
        documentsEdit && (
          <EmptyView
            id={organization.id}
            edit={documentsEdit}
            title={t('organization.view.documents')}
          />
        )
      )}
    </div>
  )
}

export { OrganizationView }
