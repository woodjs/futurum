'use client'
import { useRouter } from 'next/router';

import { IPurchaseItem } from '@/entities/purchases'
import { Skeleton } from '@/shared/ui/skeleton'
import { faker } from '@faker-js/faker'

// import Menu from './menu'
import React, { useState, useEffect } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/shared/api/config'
import ActiveBigCard from '@/entities/purchases/ui/active-big-card';
import { useGetAcitveById } from '@/entities/active/api/hooks/use-get-active-by-id';
import { IActiveBaseData } from '@/entities/active';
import { GradientTypography } from '@/shared/ui';





export const ActiveCard = ({ id }: { id: string }) => {
  console.log(id);

  let purchaseItem: IActiveBaseData | undefined;

  const { data, isLoading, isSuccess } = useGetAcitveById(id ? `${id}` : '')
  console.log(data)
  if (isSuccess) {
    const url = data.nft;
    const firstSlashIndex = url.indexOf('/');
    const secondSlashIndex = url.indexOf('/', firstSlashIndex + 1);
    const result_url_nft = url.slice(secondSlashIndex);
    console.log("result_url_nft"); // 'api/v1/files/9b46e8bfa13c53995f99c.png'
    console.log(result_url_nft); // 'api/v1/files/9b46e8bfa13c53995f99c.png'

    purchaseItem = {
      id: data.id,
      cathegory: data.cathegory,
      activeName: data.activeName,
      headline: data.headline,
      description: data.description,
      tags: data.tags,
      minContribution: data.minContribution,
      purposeCollection: data.purposeCollection,
      endingDate: data.endingDate,
      userId: data.userId,
      documentIds: data.documentIds,
      nft: API_URL + result_url_nft,
      galeryImagesIds: data.galeryImagesIds,
      organizationId: data.organizationId,



      // author: {
      //   id: faker.string.uuid(),
      //   name: faker.person.firstName(),
      //   image: '',
      // },
      // expired: faker.date.future(),
      // likes: faker.number.int({ min: 0, max: 100 }),
      // isLiked: faker.datatype.boolean(),
      // purchaseDate: faker.date.past(),

      // const transformedData = data ? transformData(data) : [];
    }
  }



  const newisLoading = false
  const newisSuccess = true
  return (
    <>
      
      <div className={'flex flex-col flex-wrap  gap-[24px]'} >
        {newisLoading &&
          <div className=''>
            <Skeleton className='h-[344px] w-full rounded-2xl' />
            <Skeleton className='mt-4 h-3 w-1/3 rounded-full' />
            <Skeleton className='mt-1 h-5 w-2/3 rounded-full' />
          </div>
        }
        {purchaseItem &&
          <ActiveBigCard
            //   menuSlot={<Menu id={item.id} />}
            {...purchaseItem}
          />
        }
      </div >
    </>

  )
}