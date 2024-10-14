import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface AlertProps {
  children: ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children }) => {
  const alertRoot = document.getElementById('alert-root');
  return alertRoot ? ReactDOM.createPortal(children, alertRoot) : null;
};

export default Alert;