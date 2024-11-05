'use client'
import { FC } from 'react'
import { IPurchaseItem } from '../api'
import ActiveBodyCard from '@/shared/ui/active-card'
import NftcardHeader from '@/shared/ui/nftcard-header'
import NftImage from '@/shared/ui/nft-image'
import ActiveInnerContent from '@/shared/ui/nft-inner-content'
import ActiveFooter from '@/shared/ui/active-footer'
import { format } from 'date-fns'
import { getDateLocale } from '@/shared/lib/get-date-locale'
import { useLocale } from 'next-intl'
import { Button, GradientTypography } from '@/shared/ui'
import ActiveCardTimer from '@/shared/ui/active-timer'
import Link from 'next/link'

interface IProps extends IPurchaseItem {
  menuSlot?: React.ReactNode
}

const ActiveCard: FC<IProps> = ({
  id,
  tag,
  image,
  params,
  price,
  purchaseDate,
  title,
  menuSlot,
}) => {
  const locale = useLocale()
  return (
    <>
      <div className='flex gap-6'>
        <ActiveBodyCard
          Header={<NftcardHeader content={tag} />}
          Image={<NftImage imageSrc={image} />}
          Content={<ActiveInnerContent content={params} />}
          Footer={<ActiveFooter ButtonSlot={menuSlot} price={price.toString()} />}
        />
        <div className='flex flex-col justify-around'>
          <div className={'mt-2 text-xs text-slate-500 '}>
            {format(purchaseDate, 'dd MMMM HH:MM', {
              locale: getDateLocale(locale),
            })}
          </div>
          <GradientTypography className=' text-4xl'>
            <Link href={`/${locale}/active/${id}`}>
            {title}
            </Link>
          </GradientTypography>
          <div className='w-[600px]'><p>Ты готов к приключению, которое откроет перед тобой
            двери в мир больших возможностей и успеха? Играя, ты не только проводишь время с интересом, 
обучаясь основам криптоиндустрии и финансового мра,
            но и зарабатываешь реальные деньги, которые сможешь потратить по своему усмотрению!</p>
            </div>
            <div className='flex'><span>Активный</span><ActiveCardTimer content={'40d:12h:06m'} /></div>
            <div>иконки</div>
            <Button type='button' className='w-[320px]'>Поместить в Топ</Button>
          </div>
      </div>
    </>
  )
}

export default ActiveCard
