'use client'
import { FC } from 'react'
import { IPurchaseItem } from '../api'
import Nftcard from '@/shared/ui/nftcard'
import NftcardHeader from '@/shared/ui/nftcard-header'
import NftImage from '@/shared/ui/nft-image'
import NftInnerContent from '@/shared/ui/nft-inner-content'
import NftFooter from '@/shared/ui/nft-footer'
import { format } from 'date-fns'
import { getDateLocale } from '@/shared/lib/get-date-locale'
import { useLocale } from 'next-intl'

interface IProps extends IPurchaseItem {
  menuSlot?: React.ReactNode
}

const PurchaseCard: FC<IProps> = ({
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
    <div className='max-w-[220px]'>
      <Nftcard
        Header={<NftcardHeader content={tag} />}
        Image={<NftImage imageSrc={image} />}
        Content={<NftInnerContent content={params} />}
        Footer={<NftFooter ButtonSlot={menuSlot} price={price.toString()} />}
      />
      <div className={'mt-4 text-xs text-slate-500'}>
        {format(purchaseDate, 'dd MMMM HH:MM', {
          locale: getDateLocale(locale),
        })}
      </div>
      <div className={'mt-1 text-lg text-black'}>{title}</div>
    </div>
  )
}

export default PurchaseCard
