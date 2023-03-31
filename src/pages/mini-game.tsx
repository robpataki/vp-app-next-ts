import { useEffect, useState } from 'react';
import Head from 'next/head';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { fetchProducts } from '@/api/service';

import { useCardGame } from '@/hooks/useCardGame';
import { Card } from '@/components/Card/Card';

import { QUERY_KEY } from '@/constants/global.constants';

const getProducts = () => {
  return fetchProducts({ size: 4 }).then((response) => response.products);
};

export default function Toilets() {
  const { data: products, isLoading } = useQuery([QUERY_KEY], getProducts, {
    enabled: true,
  });

  const cards = products.map((product, index: number) => {
    const { image } = product;
    return {
      imageURL: image.url,
      imageAltText: image.attributes.imageAltText,
      index,
    };
  });
  const { shuffleCards } = useCardGame();
  const [shuffledCards, setShuffledCards] = useState<any[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [foundMatches, setFoundMatches] = useState<number>(0);
  const totalMatches = shuffledCards.length / 2;

  const flipCard = (index: number) => {
    setFlippedCards([...flippedCards, index]);
  };

  useEffect(() => {
    setShuffledCards(shuffleCards([...cards, ...cards]));
  }, []);

  useEffect(() => {
    console.log(matchedCards);
  }, [matchedCards]);

  useEffect(() => {
    if (flippedCards.length > 2) {
      setFlippedCards(
        flippedCards.slice(flippedCards.length - 1, flippedCards.length),
      );
    }

    if (flippedCards.length === 2) {
      if (
        shuffledCards[flippedCards[0]].index ===
        shuffledCards[flippedCards[1]].index
      ) {
        setFoundMatches(matchedCards.length / 2 + 1);
        setTimeout(() => {
          setMatchedCards([...matchedCards, flippedCards[0], flippedCards[1]]);
          setFlippedCards([]);
        }, 700);
      }
    }
  }, [flippedCards, shuffledCards]);

  return (
    <>
      <Head>
        <title>Mini game</title>
        <meta name="description" content="Card memory mini-game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        Found matches: {foundMatches} / {totalMatches}
        <div className="card-game">
          {isLoading && <span>Loading...</span>}
          {shuffledCards && (
            <ul className="card-grid">
              {shuffledCards.map((card: any, index: number) => {
                const { imageURL, imageAltText } = card;
                const cardKey = `card-${index}`;
                return (
                  <li className="card-grid__item" key={cardKey}>
                    <Card
                      {...{ index, imageURL, imageAltText }}
                      flipped={flippedCards.includes(index)}
                      matched={matchedCards.includes(index)}
                      onClick={() => {
                        if (!flippedCards.includes(index)) {
                          flipCard(index);
                        }
                      }}
                    />
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
