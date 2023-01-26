import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';
export function Button({ onClick }) {
  return (
    <ButtonLoadMore type="button" onClick={onClick}>
      Load More
    </ButtonLoadMore>
  );
}
Button.protoTypes = {
  onclick: PropTypes.func.isRequired,
};
