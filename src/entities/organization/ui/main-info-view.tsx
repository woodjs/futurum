import { CheckBadgeIcon } from '@heroicons/react/24/solid'
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
  verified?: boolean
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
  verified,
  id,
}) => {
  return (
    <div>
      <div className='space-y-1'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-wrap items-center text-xl font-bold text-slate-800 md:text-3xl'>
            {companyName}{' '}
            {!verified && (
              <CheckBadgeIcon className='ml-2 inline-block size-5 flex-shrink-0 text-blue-500 md:size-7' />
            )}
          </div>
          {edit && edit({ id })}
        </div>
        <div className='text-base text-slate-600'>
          <Globe2 className='mb-1 inline size-4' /> {country}, {city}, {address}
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
