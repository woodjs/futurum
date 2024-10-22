'use client'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

interface IDescriptionViewProps {
  description: string
  id: string
  edit?: FC<{ id: string }>
}

const DescriptionView: FC<IDescriptionViewProps> = ({
  description,
  id,
  edit,
}) => {
  const t = useTranslations()
  return (
    <div className='mt-6'>
      <div className='flex items-center justify-between'>
        <div className='text-xl font-bold'>
          {t('organization.view.description')}
        </div>
        {edit && edit({ id })}
      </div>
      <div
        className='prose mt-2'
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  )
}

export default DescriptionView
