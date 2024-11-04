import axios from 'axios';
import { Category } from './types';

// Функция для получения категорий с API
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get('/api/v1/organization-businesses');
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при получении категорий');
  }
};
