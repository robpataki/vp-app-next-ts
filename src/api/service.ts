import apiClient from '@/api/client';

type TFetchOptions = {
  query?: string;
  size?: number;
  pageNumber?: number;
};

export const fetchProducts = async (options: TFetchOptions) => {
  const { size = 10, pageNumber = 1, query = 'toilets' } = options;

  const response = await apiClient.post('', {
    query,
    pageNumber,
    size,
    additionalPages: 0,
    sort: 1,
  });

  return response.data;
};
