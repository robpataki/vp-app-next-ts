export type TFetchOptions = {
  query?: string;
  size?: number;
  pageNumber?: number;
};

export type TPagination = {
  from: number;
  size: number;
  total: number;
  sortType: number;
};

export type TProduct = {
  productName: string;
  id: string;
  slug: string;
  image: {
    url: string;
    attributes: {
      imageAltText: string;
    };
  };
};

export type TAPIResponse = {
  data: {
    pagination: TPagination;
    products: Array<TProduct>;
  };
};
