import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from './api';
import { Category } from './types';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

// Предопределенный список категорий
const fallbackCategories: Category[] = [
  { id: '1', name: 'Категория по умолчанию 1' },
  { id: '2', name: 'Категория по умолчанию 2' },
  { id: '3', name: 'Категория по умолчанию 3' },
];

// Кастомный хук для получения категорий с хендлингом ошибок
export const useCategories = () => {
  const { enqueueSnackbar } = useSnackbar();

  const query = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 минут
  });

  // Обработчик ошибки через useEffect
  useEffect(() => {
    if (query.error) {
      enqueueSnackbar(`Ошибка загрузки категорий: ${query.error.message}`, {
        variant: 'error',
      });
    }
  }, [query.error, enqueueSnackbar]);

  // Если данные пустые или произошла ошибка, возвращаем предопределенный список
  const categories = query.data && query.data.length > 0 ? query.data : fallbackCategories;

  return {
    data: categories,
    isLoading: query.isLoading,
    error: query.error,
    isFallback: !query.data || query.error,
  };
};
