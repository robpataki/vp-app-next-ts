import Image from 'next/image';
import { Button } from '@carbon/react';

export type TProductTile = {
  imageURL: string;
  imageAltText: string;
  url: string;
  productName: string;
  price: string;
  netPrice: string;
  isOnPromotion: boolean;
};

const TILE_WIDTH = 400;
const TILE_HEIGHT = 400;

export function ProductTile(props: TProductTile) {
  const {
    imageURL,
    imageAltText,
    url,
    productName,
    price,
    netPrice,
    isOnPromotion,
  } = props;

  return (
    <div className="product-tile">
      <Image
        className="product-tile__image"
        width={TILE_WIDTH}
        height={TILE_HEIGHT}
        src={imageURL}
        alt={imageAltText}
      />
      <div className="product-tile__details">
        <h2 className="product-tile__name">{productName}</h2>
        {isOnPromotion && <>SALE!</>}
        <span className="product-tile__price">
          <span>Price: </span>£{price} (£{netPrice} plus VAT)
        </span>
      </div>
      <Button
        href={url}
        size="sm"
        kind="secondary"
        className="product-tile__button"
      >
        View <span className="visually-hidden">{productName}</span>&nbsp;
        <span aria-hidden="true">product</span>
      </Button>
    </div>
  );
}

export default ProductTile;
