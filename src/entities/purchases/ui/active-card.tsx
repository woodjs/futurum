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
import { Button, GradientTypography, Typography } from '@/shared/ui'
import ActiveCardTimer from '@/shared/ui/active-timer'
import Link from 'next/link'

interface IProps extends IPurchaseItem {
  menuSlot?: React.ReactNode
}

const ActiveCard: FC<IProps> = ({
  id,
  tag,
  image,
  endingDate,
  params,
  description,
  minContribution,
  collection:color,
  price,
  purchaseDate,
  title,
  menuSlot,
}) => {
  const locale = useLocale()
  console.log("color color color color color")
  console.log(color.color)
  const colors = color.color;
  return (
    <>
      <div className='flex gap-6 ' >
        <ActiveBodyCard
          Header={<NftcardHeader content={tag} />}
          Image={<NftImage imageSrc={image} />}
          Content={<ActiveInnerContent minCont={minContribution} />}
          Footer={<ActiveFooter ButtonSlot={menuSlot} price={price.toString()} stylebg={colors}/>}
        />
        <div className='flex flex-col space-between justify-between '>
          <div className={'mt-2 text-xs text-slate-500 '}>
            {format(endingDate || purchaseDate, 'dd MMMM HH:MM', {
              locale: getDateLocale( locale),
            })}
          </div>
          <GradientTypography className=' text-4xl'>
            <Link href={`/${locale}/active/${id}`}>
            {title}
            </Link>
          </GradientTypography>

          <div className='w-[600px]'>
            </div>
            <Typography className='py-4 text-lg'>{description}</Typography>
            {/* <div className='flex'><span>Активный</span><ActiveCardTimer content={ endingDate || '40d:12h:06m'} /></div>
            <div>иконки</div> */}
            <Button type='button' className='w-[320px]'>Поместить в Топ</Button>
          </div>
      </div>
    </>
  )
}

export default ActiveCard
