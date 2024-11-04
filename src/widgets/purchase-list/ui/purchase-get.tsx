import React, { useState, useEffect } from 'react';
import { IPurchaseItem } from '@/entities/purchases';
import PurchaseCard from '@/entities/purchases/ui/purchase-card';
import Loader from '@/shared/ui/loader';
import Menu from './menu';
import Cookies from 'js-cookie'
import { protectedAPI } from '@/shared/api';
import { GET_NFT, AUTH_SIGN_UP } from '@/shared/api/config';
import router from 'next/router';
import { useRouter } from '@/i18n/routing';
import { errorClientHandler } from '@/shared/api/helpers/auth.helper';

const AUTH_TOKEN_KEY = 'auth-token-data'


const fetchPurchaseItems = async (count: number, token: string): Promise<IPurchaseItem[]> => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/actives?id=2`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Передача токена
          'Content-Type': 'application/json'  // Убедитесь, что указаны корректные заголовки
        }
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
  
      const rawData = await response.json();
      const purchaseItems = rawData.map((item: any) => ({
        // Маппинг данных...
      }));
  
      return purchaseItems;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return []; // Обработка ошибки
    }
  };

  const token = 'ваш_токен';
fetchPurchaseItems(30, token)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });

  