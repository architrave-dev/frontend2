import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? ReactDOM.createPortal(children, modalRoot) : null;
};

export default Modal;
