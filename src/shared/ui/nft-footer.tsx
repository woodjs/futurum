import { cn } from '@/shared/lib/utils'
import { FC } from 'react'
import { Button } from '@/shared/ui/button'
import NftcardTimer from '@/shared/ui/nft-timer'
import { useTranslations } from 'next-intl'

interface IProps {
  ButtonSlot?: React.ReactNode
  Description?: React.ReactNode
  bgColor?: string
  borderColor?: string
  height?: 'h-[149px]' | 'h-[75px]'
  price: string
  priceColor?: string
}

const NftFooter: FC<IProps> = ({
  bgColor = 'bg-gray',
  borderColor,
  Description,
  ButtonSlot,
  height = 'h-[75px]',
  price,
  priceColor = 'text-black',
}) => {
  const t = useTranslations('default.Home.Categories')

  return (
    <div
      className={cn(
        'relative -top-[22px] w-full rounded-b-[14px] border border-solid pl-2 pr-2',
        bgColor,
        borderColor,
        height,
      )}
    >
      <div className={'absolute -top-[12px] left-1/2 z-10 -translate-x-1/2'}>
        <NftcardTimer content={'40d:12h:06m'} />
      </div>
      {Description && (
        <div className={'mb-[12px] mt-[16px]'}>{Description}</div>
      )}
      <div
        className={cn(
          'flex items-center justify-between',
          !Description && 'h-full',
        )}
      >
        <div>
          <p className={cn('text-[12px] font-bold', priceColor)}>
            {t('Price')}
          </p>
          <p className={cn('text-[14px] font-bold', priceColor)}>{price}</p>
        </div>
        <div>
          {ButtonSlot || (
            <Button className={'w-[95px] text-[14px]'}>{t('Buy')}</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default NftFooter
