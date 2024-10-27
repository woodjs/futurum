import { Tariff } from '@/shared/api/types'
import { FC } from 'react'
import { ButtonName } from '../lib/buttonName'
import { useTranslations } from 'next-intl'

interface ITarrifCardProps {
  variant?: Tariff
  buttonName: ButtonName
  onButtonClick: (variant: string) => void
  mode?: 'Month' | 'Year'
}

const TariffCard2: FC<ITarrifCardProps> = () => {
  const t = useTranslations('Tariffs')

  return (
    <div className='w-full text-center'>
      <div>Basic</div>
      <div>Бесплатно</div>
    </div>
  )
}

export default TariffCard2
