import { IPurchaseItem } from '@/entities/purchases'
import PurchaseCard from '@/entities/purchases/ui/purchase-card'
import Loader from '@/shared/ui/loader'
import { Skeleton } from '@/shared/ui/skeleton'
import { faker } from '@faker-js/faker'
// import Menu from './menu'
import React, { useState, useEffect } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next';
import ActiveCard from '@/entities/purchases/ui/active-card'
import { useGetActivesList } from '@/entities/active/api'


const generatePurchaseItems = (data: any[]): IPurchaseItem[] => {
    const purchaseItems: IPurchaseItem[] = []
    const count = 30
    
    if (data && data.length > 0) {
      for (let i = 0; i < count; i++) {
        const purchaseItem: IPurchaseItem = {
          id: data[i].id,
          image: `/images/nfts/profit-${faker.number.int({ min: 1, max: 5 })}.jpg`,
          title: data[i].activeName,
          description: data[i].description,
          price: data[i].purposeCollection,
          type: faker.word.words(),
          category: data[i].category,
          tag: data[i].tags,
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
    } else {
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
    }
    
  
    return purchaseItems
  }
  
  
  
export const ActivesList = () => {

  const { data, isLoading, isSuccess } = useGetActivesList()
  // const transformedData = data ? transformData(data) : [];
  const purchaseList: IPurchaseItem[] = data ? generatePurchaseItems(data.data) : generatePurchaseItems([]);
  
  const newisLoading = false
  const newisSuccess = true

    return (
      <div className={'flex flex-col flex-wrap  gap-[24px]'}>
        {newisLoading &&
          purchaseList.map((item, index) => (
            <div className='' key={item.id}>
              <Skeleton className='h-[344px] w-full rounded-2xl' />
              <Skeleton className='mt-4 h-3 w-1/3 rounded-full' />
              <Skeleton className='mt-1 h-5 w-2/3 rounded-full' />
            </div>
          ))}
        {newisSuccess &&
          purchaseList.map((item, index) => (
            <ActiveCard
            //   menuSlot={<Menu id={item.id} />}
              key={item.id}
              {...item}
            />
          ))}
      </div>
    )
  }