'use client'

import React from 'react'

import { Button, Container, GradientTypography } from '@/shared/ui'
import { useRouter } from '@/i18n/routing'
import { Routes } from '@/shared/model/routes'
import ScrollToTop from '@/shared/ui/scroll-to-top'
import { StatusFilter } from '@/features/actives-filter/ui/status-filter'
import { ActivesList } from '@/widgets/active-list'
import { useGetActivesList } from '@/entities/active/api'


export default function Home() {
  const { push } = useRouter()
  const { data: activeData, isLoading, isSuccess } = useGetActivesList({ my: true })
  const handleButtonClick = () => push(Routes.CREATE_ASSET)
  const handleButtonClick2 = () => push(Routes.CREATE_ASSET_NFT)
  
  // Пример входящего JSON
const jsonData = {
  "data": [
    {
      "id": 0,
      "cathegory": "Бизнес",
      "organizationId": "696aa952-aa13-4076-9ace-c638c3c11845",
      "activeName": "hello",
      "headline": "Head line",
      "description": "Description",
      "tags": [
        "#nice",
        "#good"
      ],
      "minContribution": 100,
      "purposeCollection": 10000,
      "endingDate": "2024-07-30T13:18:01.145Z",
      "documentIds": [
        "696aa952-aa13-4076-9ace-c638c3c11845"
      ],
      "nftId": "696aa952-aa13-4076-9ace-c638c3c11845",
      "galeryImagesIds": "696aa952-aa13-4076-9ace-c638c3c11845"
    },
    {
      "id": 1,
      "cathegory": "Бизнес",
      "organizationId": "696aa952-aa13-4076-9ace-c638c3c11845",
      "activeName": "hello",
      "headline": "Head line",
      "description": "Description",
      "tags": [
        "#nice",
        "#good"
      ],
      "minContribution": 100,
      "purposeCollection": 10000,
      "endingDate": "2024-07-30T13:18:01.145Z",
      "documentIds": [
        "696aa952-aa13-4076-9ace-c638c3c11845"
      ],
      "nftId": "696aa952-aa13-4076-9ace-c638c3c11845",
      "galeryImagesIds": "696aa952-aa13-4076-9ace-c638c3c11845"
    }
  ],
  "hasNextPage": true
};

// Парсинг данных
const { data, hasNextPage } = jsonData;

data.forEach(item => {
  console.log(`ID: ${item.id}`);
  console.log(`Категория: ${item.cathegory}`);
  console.log(`Название: ${item.activeName}`);
  console.log(`Заголовок: ${item.headline}`);
  console.log(`Описание: ${item.description}`);
  console.log(`Теги: ${item.tags.join(', ')}`);
  console.log(`Минимальный взнос: ${item.minContribution}`);
  console.log(`Цель сбора: ${item.purposeCollection}`);
  console.log(`Дата окончания: ${new Date(item.endingDate).toLocaleString()}`);
  console.log(`ID документов: ${item.documentIds.join(', ')}`);
  console.log(`NFT ID: ${item.nftId}`);
  console.log(`ID изображений галереи: ${item.galeryImagesIds}`);
  console.log('--------------------------------');
});

// Пример использования данных
activeData?.data.forEach(item => {
  console.log(`ID: ${item.id}`);
  console.log(`Категория: ${item.cathegory}`);
  console.log(`Название: ${item.activeName}`);
  console.log(`Заголовок: ${item.headline}`);
  console.log(`Описание: ${item.description}`);
  console.log(`Теги: ${item.tags.join(', ')}`);
  console.log(`Минимальный взнос: ${item.minContribution}`);
  console.log(`Цель сбора: ${item.purposeCollection}`);
  console.log(`Дата окончания: ${new Date(item.endingDate).toLocaleString()}`);
  console.log(`ID документов: ${item.documentIds.join(', ')}`);
  console.log(`NFT ID: ${item.nftId}`);
  console.log(`ID изображений галереи: ${item.galeryImagesIds}`);
  console.log('--------------------------------');
});

// Состояние пагинации
console.log(`Есть ли следующая страница: ${hasNextPage}`);


  return (
    <div className={'relative'}>
      <Container>
        <div className='flex flex-col gap-6'>
          <GradientTypography>Мои активы</GradientTypography>
          <div className='flex gap-6'>
          <Button onClick={handleButtonClick} className='max-w-40' size='sm'>
            Создать актив
          </Button>
          <Button onClick={handleButtonClick2} className='max-w-40' size='sm'>
            Создать актив nft
          </Button>
          </div>
          <StatusFilter />

          <ActivesList />
        </div>
      </Container>
      <ScrollToTop />

    </div>
  )
}
