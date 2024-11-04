import axios from 'axios';
import { Lisorg } from './types';

// Функция для получения категорий с API
export const fetchCategories = async (): Promise<Lisorg[]> => {
  try {
    const response = await axios.get('/api/v1/organization-businesses');
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при получении организаций');
  }
};
