import { FC } from 'react'
import { IBusinessOrganization } from '../model'
import Image from 'next/image'
import SocialList from './social-list'
import { EmployeesView } from './employees-view'
import { FinancialView } from './fincial-view'
import { DocumentsView } from './documents-view'
import { Globe, Globe2 } from 'lucide-react'
import DescriptionView from './description-view'
import LogoView from './logo-view'
import MainInfoView from './main-info-view'

interface IBusinessViewProps extends IBusinessOrganization {}

const BusinessView: FC<IBusinessViewProps> = ({
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
  financialInfo,
  documents,
}) => {
  return (
    <div className='w-full space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-black'>
      {logo && <LogoView logo={logo} />}
      <MainInfoView
        address={address}
        city={city}
        companyName={companyName}
        country={country}
        ownershipForm={ownershipForm}
        positionInCompany={positionInCompany}
      />
      {description && <DescriptionView description={description} />}
      {socialMedia && <SocialList links={socialMedia} />}
      {financialInfo && <FinancialView {...financialInfo} />}
      {employees && <EmployeesView employees={employees} />}
      {documents && <DocumentsView {...documents} />}
    </div>
  )
}

export default BusinessView
