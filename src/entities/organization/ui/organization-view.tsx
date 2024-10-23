import { FC } from 'react'
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
      {description && (
        <DescriptionView
          id={organization.id}
          edit={descriptionEdit}
          description={description}
        />
      )}
      {socialMedia && (
        <SocialList
          id={organization.id}
          edit={socialMediaEdit}
          links={socialMedia}
        />
      )}
      {organization.type === OrganizationType.STARTUP &&
        organization.fundingInfo && (
          <StartPageView
            id={organization.id}
            edit={startPageEdit}
            fundingInfo={organization.fundingInfo}
          />
        )}
      {organization.type === OrganizationType.BUSINESS &&
        organization.financialInfo && (
          <FinancialView
            id={organization.id}
            edit={financialInfoEdit}
            {...organization.financialInfo}
          />
        )}
      {employees && !!employees.length && (
        <EmployeesView
          id={organization.id}
          edit={employeesEdit}
          employees={employees}
        />
      )}
      {documents && (
        <DocumentsView
          id={organization.id}
          edit={documentsEdit}
          {...documents}
        />
      )}
    </div>
  )
}

export { OrganizationView }
