import apiClient from '@/api/client';

export const fetchProducts = async (options: { size?: number }) => {
  const { size = 10 } = options;

  const response = await apiClient.post('', {
    query: 'toilets',
    pageNumber: 1,
    size,
    additionalPages: 0,
    sort: 1,
  });

  return response.data;
};
