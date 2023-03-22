import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '@/styles/Toilets.module.css';

import axios from 'axios';

const API_URL =
  'https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI&';
const BASE_URL = 'https://www.victorianplumbing.co.uk';

export default function Toilets() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .post(
        API_URL,
        {
          query: 'toilets',
          pageNumber: 0,
          size: 0,
          additionalPages: 0,
          sort: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(function (response) {
        setProducts(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
          {products && (
            <ul className={styles.cardGrid}>
              {products.map((product, index) => {
                const { image } = product;
                const cardKey = `card-${index}`;
                return (
                  <li className={styles.card} key={cardKey}>
                    <a href={`${BASE_URL}/${product.slug}`}>
                      <div>
                        {product.productName}, {index}
                      </div>
                      <img
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
