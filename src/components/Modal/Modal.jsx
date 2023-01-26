import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from 'components/Modal/Modal.styled';
const modalRoot = document.querySelector('#modal-root');
export function Modal({ onToggleModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.addEventListener('keydown', handleKeyDown);
  });
  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onToggleModal();
    }
  };
  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onToggleModal();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
}
Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};
