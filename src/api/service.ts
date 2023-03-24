import apiClient from '@/api/client';

export const fetchProducts = async () => {
  const response = await apiClient.post('', {
    query: 'toilets',
    pageNumber: 1,
    size: 28,
    additionalPages: 0,
    sort: 1,
  });

  return response.data;
};
