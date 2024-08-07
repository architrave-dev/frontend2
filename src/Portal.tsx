import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const portalRoot = document.getElementById('portal-root');
  return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null;
};

export default Portal;