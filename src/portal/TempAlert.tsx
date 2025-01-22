import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface TempAlertProps {
  children: ReactNode;
}

const TempAlert: React.FC<TempAlertProps> = ({ children }) => {
  const tempAlertRoot = document.getElementById('temp-alert-root');
  return tempAlertRoot ? ReactDOM.createPortal(children, tempAlertRoot) : null;
};

export default TempAlert;
