import apiClient from '@/api/client';
import type { TFetchOptions, TAPIResponse } from './service.types';

export const fetchProducts = async (options: TFetchOptions) => {
  const { size = 10, pageNumber = 1, query = 'toilets' } = options;

  console.log('fetchProducts() - ', size, pageNumber, query);

  const response = await apiClient.post<TAPIResponse>('', {
    query,
    pageNumber,
    size,
    additionalPages: 0,
    sort: 1,
  });

  const { data } = response;
  console.log('fetchProducts(): ', data);
  return data;
};
