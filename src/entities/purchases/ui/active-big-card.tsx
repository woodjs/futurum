'use client'
import { FC, useState } from 'react'
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
import { IActiveBaseData2 } from '@/entities/active'
import Link from 'next/link'
import Image from 'next/image';
import ActiveBodyCardBig from '@/shared/ui/active-card-big'

interface IProps extends IPurchaseItem {
  menuSlot?: React.ReactNode
}

const ActiveBigCard: FC<IActiveBaseData2> = ({
  id,
  cathegory,
  activeName,
  headline,
  description,
  tags,
  minContribution,
  purposeCollection,
  endingDate,
  userId,
  documentIds,
  nft,
  galeryImagesIds,
  organizationId,
}) => {
  const text = description;
  const locale = useLocale()
  const [isExpanded, setIsExpanded] = useState(false);
  const maxCharacters = 100; // Максимальное количество символов для отображения

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <GradientTypography>{activeName}</GradientTypography>
      <div className='flex gap-6 w-full'>
        <ActiveBodyCardBig
          Header={<NftcardHeader content={tags} />}
          Image={<NftImage imageSrc={nft } />}
          Footer={<ActiveFooter ButtonSlot={<Button className={'w-[105px] p-4 text-[14px]'}>Купить</Button>} price={purposeCollection.toString()} />}
        />
        <div className='flex flex-1 flex-col justify-around'>
          <div className='flex flex-1 justify-between'>
            <div>
              <div className='flex flex-col'>
                <Typography className='py-1 text-lg font-bold'>Параметры актива:</Typography>
                <Typography className='text-sm'>Стоимость: {purposeCollection}</Typography>
                <Typography className='text-sm'>Доходность: {minContribution} %</Typography>
                {/* <Typography className='text-sm'>Частота выплат: - </Typography> */}
                {/* <Typography className='text-sm'>Возврат средств: через год</Typography> */}
                <Typography className='text-sm'>Срок активности: до {endingDate}</Typography>
              </div>
              {/* <div className={'mt-2 text-xs text-slate-500 '}>
              {format(endingDate, 'dd MMMM HH:MM', {
                locale: getDateLocale(locale),
              })}
            </div> */}
              <div className='py-4 flex gap-4'>
                <Button variant='secondary' type='button' className='bg-secondary w-[220px]'>В корзину</Button>
                <Button type='button' className='w-[220px]'>Купить</Button>
              </div>
            </div>
            <div>
              <p>В избранное</p>
              <p>Поделиться</p>
            </div>
          </div>
          <div className='w-[800px]'>
            <Typography className='py-1 text-lg font-bold'>Описание:</Typography>
            <div dangerouslySetInnerHTML={{ __html: text }} />
            <p>
              {isExpanded ? text : text.slice(0, maxCharacters) + (text.length > maxCharacters ? '...' : '')}
            </p>
            {text.length > maxCharacters && (
              <Button
                onClick={handleToggleExpand}
                variant="secondary"
                className="mt-2 text-blue-500 hover:underline"
              >
                {isExpanded ? 'Свернуть' : 'Развернуть'}
              </Button>
            )}
          </div>
          {/* <div className='flex'><span>Активный</span><ActiveCardTimer content={'40d:12h:06m'} /></div>
          <div>иконки</div> */}
          <div className='flex flex-col'>
            <Typography className='py-4 text-lg font-bold'>Коллекция:</Typography>
            <Link href="#" className='text-blue-700'>
              Название название
            </Link>
            <Typography className='py-4 text-lg font-bold'>Теги:</Typography>
            <Typography className='text-sm'>#{tags}</Typography>
          </div>
          <Button type='button' className='my-6 w-[260px]'>Документы компании</Button>
        </div>
        {/* <div className='flex flex-col'>
          <p>UUID Категории: <span className='colorbg-clip-textbg-gradient-to-r from-gradient-accent-start to-gradient-accent-end'>{cathegory}</span></p>
          <p>headline: <span>{headline}</span></p>
          <p>Описание: <span>{description}</span></p>
          <p>minContribution: <span>{minContribution}</span></p>
          <p>userId: <span>{userId}</span></p>
          <p>documentIds: <span>{documentIds}</span></p>
        </div> */}
      </div>
      <div className='flex flex-col'>
        <Typography className='py-4 text-2xl font-bold'>Галерея:</Typography>
        <div className='flex py-8 flex-row gap-6'>
          <div
            className={
              'w-[120px] h-[120px] relative -top-[20px] -z-10 rounded-t-[14px] overflow-hidden'
            }
          >
            <Image fill src={nft || ""} alt={'nft card image'} />

          </div>
          <div
            className={
              'w-[120px] h-[120px] relative -top-[20px] -z-10 rounded-t-[14px] overflow-hidden'
            }
          >
            <Image fill src={nft || ""} alt={'nft card image'} />

          </div>
        </div>
        <Typography className='py-4 text-2xl font-bold'>Комментарии:</Typography>
      </div>
    </>
  )
}

export default ActiveBigCard