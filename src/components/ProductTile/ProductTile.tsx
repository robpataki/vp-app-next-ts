import Image from 'next/image';

export type TProductTile = {
  imageURL: string;
  imageAltText: string;
  url: string;
};

const TILE_WIDTH = 400;
const TILE_HEIGHT = 400;

export function ProductTile(props: TProductTile) {
  const { imageURL, imageAltText, url } = props;

  return (
    <div className="product-tile">
      <a href={url} className="product-tile__link">
        <Image
          className="product-tile__image"
          width={TILE_WIDTH}
          height={TILE_HEIGHT}
          src={imageURL}
          alt={imageAltText}
        />
      </a>
    </div>
  );
}

export default ProductTile;
