import Head from 'next/head';
import { useState, useEffect } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';

// TODO:Rob - Figure out why TypeScript can't see the component definition
import { Pagination } from '@carbon/react';

import { fetchProducts } from '@/api/service';
import { ProductTile } from '@/components/ProductTile/ProductTile';
import { BASE_URL, QUERY_KEY } from '@/constants/global.constants';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 25;

const getProducts = ({ pageNumber = DEFAULT_PAGE_NUMBER }) => {
  return fetchProducts({
    size: DEFAULT_PAGE_SIZE,
    pageNumber,
  }).then((response) => response);
};

export default function Toilets() {
  const [pageNumber, setPageNumber] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  useEffect(() => {
    console.log('setPageNumber: ', pageNumber);
  }, [pageNumber]);

  const { data, isLoading } = useQuery([QUERY_KEY], getProducts, {
    enabled: true,
    pageNumber,
    pageSize,
  });

  const productCards = data.products.map((product: any, index: number) => {
    const { image, slug } = product;
    return {
      imageURL: image.url,
      imageAltText: image.attributes.imageAltText,
      url: `${BASE_URL}/${slug}`,
      index,
    };
  });

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Toilets, who doesn't like toilets?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <>
          {isLoading && <span>Loading...</span>}

          <Pagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText="Items per page:"
            onChange={function noRefCheck(a: any) {
              setPageNumber(a.page);
              setPageSize(a.pageSize);
              console.log(a);
            }}
            page={pageNumber}
            pageSize={DEFAULT_PAGE_SIZE}
            pageSizes={[
              DEFAULT_PAGE_SIZE,
              DEFAULT_PAGE_SIZE * 2,
              DEFAULT_PAGE_SIZE * 5,
            ]}
            size="lg"
            totalItems={data.pagination.total}
          />

          {productCards && (
            <ul className="product-tile-list">
              {productCards.map((card: any, index: number) => {
                const { imageURL, imageAltText, url } = card;
                const tileKey = `product-tile-${index}`;
                return (
                  <li className="product-tile-list__item" key={tileKey}>
                    <ProductTile {...{ imageURL, imageAltText, url }} />
                  </li>
                );
              })}
            </ul>
          )}
        </>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(QUERY_KEY, getProducts);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}
