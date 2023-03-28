import { useState, useEffect } from 'react';
import Image from 'next/image';

export type TCard = {
  index: number;
  imageURL: string;
  imageAltText: string;
  flipped?: boolean;
  matched?: boolean;
  onClick: () => void;
};

export function Card(props: TCard) {
  const CARD_WIDTH = 400;
  const CARD_HEIGHT = 400;

  const {
    index,
    imageURL,
    imageAltText,
    onClick,
    flipped: _flipped = false,
    matched,
  } = props;

  const [flipped, setFlipped] = useState<boolean>(false);

  useEffect(() => {
    setFlipped(_flipped);
  }, [_flipped]);

  let cardClassName = 'card';
  if (flipped) {
    cardClassName += ` card--active`;
  }
  if (matched) {
    cardClassName += ` card--matched`;
  }

  return (
    <div className="card-scene">
      <button
        type="button"
        aria-label={`Card #${index + 1}`}
        tabIndex={matched ? -1 : 0}
        onClick={() => {
          if (onClick) {
            onClick();
          }

          if (!flipped) {
            setFlipped(flipped);
          }
        }}
        className={cardClassName}
      >
        <div className="card__front-face">
          <Image
            className="card__image"
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            src={imageURL}
            alt={imageAltText}
          />
        </div>
        <div className="card__back-face"></div>
      </button>
    </div>
  );
}

export default Card;
