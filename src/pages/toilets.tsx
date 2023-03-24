import Head from 'next/head';
import Image from 'next/image';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { fetchProducts } from '@/api/service';
import styles from '@/styles/Toilets.module.css';

const BASE_URL = 'https://www.victorianplumbing.co.uk';
const QUERY_KEY = 'toilet-data;';

const getProducts = () => {
  return fetchProducts().then((response) => response.products);
};

export default function Toilets() {
  const { data: products, isLoading } = useQuery([QUERY_KEY], getProducts, {
    enabled: true,
  });

  return (
    <>
      <Head>
        <title>Let&lsquo;s see some toilets!</title>
        <meta name="description" content="Toilets, who doesn't like toilets?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          {isLoading && <span>Loading...</span>}
          {products && (
            <ul className={styles.cardGrid}>
              {products.map((product: any, index: number) => {
                const { image } = product;
                const cardKey = `card-${index}`;
                return (
                  <li className={styles.card} key={cardKey}>
                    <a href={`${BASE_URL}/${product.slug}`}>
                      {/* <div>
                        {product.productName}, {index}
                      </div> */}
                      <Image
                        width={400}
                        height={400}
                        src={image.url}
                        className={styles.cardImage}
                        alt={image.attributes.imageAltText}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
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
