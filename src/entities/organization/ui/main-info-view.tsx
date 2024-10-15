import { Globe2 } from 'lucide-react'
import { FC } from 'react'

interface IMainInfoViewProps {
  companyName: string
  country: string
  city: string
  address: string
  positionInCompany: string
  ownershipForm: string
  edit?: FC<{ id: string }>
  id: string
}

const MainInfoView: FC<IMainInfoViewProps> = ({
  companyName,
  country,
  city,
  address,
  positionInCompany,
  ownershipForm,
  edit,
  id,
}) => {
  return (
    <div>
      <div className='space-y-1'>
        <div className='flex items-center justify-between'>
          <div className='text-3xl font-bold text-slate-800'>{companyName}</div>
          {edit && edit({ id })}
        </div>
        <div className='flex items-center text-base text-slate-600'>
          <Globe2 className='mr-2 inline size-4' /> {country}, {city}, {address}
        </div>
        <div className='flex gap-2'>
          <div className='text-base text-slate-600'>
            {positionInCompany} • {ownershipForm}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainInfoView
