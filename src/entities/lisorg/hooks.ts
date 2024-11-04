import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from './api';
import { Lisorg } from './types';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

// Предопределенный список категорий
const fallbackLisorg: Lisorg[] = [
  { id: '1', name: 'Категория по умолчанию 1' },
  { id: '2', name: 'Категория по умолчанию 2' },
  { id: '3', name: 'Категория по умолчанию 3' },
];

// Кастомный хук для получения категорий с хендлингом ошибок
export const useOrg = () => {
  const { enqueueSnackbar } = useSnackbar();

  const query = useQuery<Lisorg[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 минут
  });

  // Обработчик ошибки через useEffect
  useEffect(() => {
    if (query.error) {
      enqueueSnackbar(`Ошибка загрузки организаций: ${query.error.message}`, {
        variant: 'error',
      });
    }
  }, [query.error, enqueueSnackbar]);

  // Если данные пустые или произошла ошибка, возвращаем предопределенный список
  const lisorgs = query.data && query.data.length > 0 ? query.data : fallbackLisorg;

  return {
    data: lisorgs,
    isLoading2: query.isLoading,
    error2: query.error,
    isFallback: !query.data || query.error,
  };
};
