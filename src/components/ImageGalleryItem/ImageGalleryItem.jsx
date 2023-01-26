import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';
export function ImageGalleryItem({ src, largeImageURL, alt, onClick }) {
  return (
    <Item>
      <Img src={src} alt={alt} data-source={largeImageURL} onClick={onClick} />
    </Item>
  );
}
ImageGalleryItem.protoTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
