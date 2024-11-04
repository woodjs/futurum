import { IPurchaseItem } from '@/entities/purchases'
import PurchaseCard from '@/entities/purchases/ui/purchase-card'
import Loader from '@/shared/ui/loader'
import { Skeleton } from '@/shared/ui/skeleton'
import { faker } from '@faker-js/faker'
import Menu from './menu'
import React, { useState, useEffect } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next';


const generatePurchaseItems = (count: number): IPurchaseItem[] => {
  const purchaseItems: IPurchaseItem[] = []


  for (let i = 0; i < count; i++) {
    const purchaseItem: IPurchaseItem = {
      id: faker.string.uuid(),
      image: `/images/nfts/profit-${faker.number.int({ min: 1, max: 5 })}.jpg`,
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      type: faker.word.words(),
      category: faker.word.words(1),
      tag: `#${faker.word.words(1)}`,
      params: [
        {
          title: faker.finance.transactionType(),
          value: faker.finance.amount(),
        },
        {
          title: faker.finance.transactionType(),
          value: faker.finance.amount(),
        },
      ],
      author: {
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        image: '',
      },
      expired: faker.date.future(),
      likes: faker.number.int({ min: 0, max: 100 }),
      isLiked: faker.datatype.boolean(),
      purchaseDate: faker.date.past(),
    }

    purchaseItems.push(purchaseItem)
  }

  return purchaseItems
}

const purchaseList: IPurchaseItem[] = generatePurchaseItems(30)

const isLoading = false
const isSuccess = true



export const PurchaseList = () => {

  return (
    <div className={'flex flex-wrap gap-[24px]'}>
      {isLoading &&
        purchaseList.map((item, index) => (
          <div className='w-[220px]' key={item.id}>
            <Skeleton className='h-[344px] w-full rounded-2xl' />
            <Skeleton className='mt-4 h-3 w-1/3 rounded-full' />
            <Skeleton className='mt-1 h-5 w-2/3 rounded-full' />
          </div>
        ))}
      {isSuccess &&
        purchaseList.map((item, index) => (
          <PurchaseCard
            menuSlot={<Menu id={item.id} />}
            key={item.id}
            {...item}
          />
        ))}
    </div>
  )
}

const fetchPurchaseItems = async (count: number): Promise<IPurchaseItem[]> => {
  try {
    // const response = await fetch('http://lockalhost:3000/api/v1/actives?id=3'); // Замените на реальный URL API
    // const rawData = await response.json();
    const token = 'ваш_токен'; // Замените на реальный токен

    const response = await fetch('http://localhost:3000/api/v1/actives?id=34', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Передача токена
        'Content-Type': 'application/json', // Убедитесь, что указаны корректные заголовки
      }
    });

    const rawData = await response.json();

    const purchaseItems: IPurchaseItem[] = rawData.slice(0, count).map((item: any) => ({
      id: item.id || crypto.randomUUID(), // Используем либо данные API, либо генерируем UUID
      image: item.image || `/images/nfts/profit-${Math.floor(Math.random() * 5) + 1}.jpg`,
      title: item.title || 'Default Product Name',
      description: item.description || 'Default Product Description',
      price: parseFloat(item.price) || 0.0,
      type: item.type || 'Default Type',
      category: item.category || 'Default Category',
      tag: `#${item.tag || 'default-tag'}`,
      params: [
        {
          title: item.param1Title || 'Default Param 1',
          value: item.param1Value || '0.00',
        },
        {
          title: item.param2Title || 'Default Param 2',
          value: item.param2Value || '0.00',
        },
      ],
      author: {
        id: item.authorId || crypto.randomUUID(),
        name: item.authorName || 'Default Author',
        image: item.authorImage || '',
      },
      expired: new Date(item.expired) || new Date(),
      likes: item.likes || Math.floor(Math.random() * 101),
      isLiked: item.isLiked || false,
      purchaseDate: new Date(item.purchaseDate) || new Date(),
    }));

    return purchaseItems;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return [];
  }
};


// export const PurchaseListNew = () => {
//   const [purchaseList, setPurchaseList] = useState<IPurchaseItem[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const loadPurchaseItems = async () => {
//       try {
//         const data = await fetchPurchaseItems(30);
//         setPurchaseList(data);
//       } catch (error) {
//         console.error('Ошибка при получении данных, использование сгенерированных данных.');
//         setPurchaseList(generatePurchaseItems(30)); // Генерация данных при ошибке
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadPurchaseItems();
//   }, []);

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <div className={'flex flex-wrap gap-[24px]'}>
//       {purchaseList.length === 0 && <p>Нет данных для отображения</p>}
//       {purchaseList.map((item) => (
//         <PurchaseCard menuSlot={<Menu id={item.id} />} key={item.id} {...item} />
//       ))}
//     </div>
//   );
// };