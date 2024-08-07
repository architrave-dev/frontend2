import React from 'react';
import styled from 'styled-components';
import Portal from '../Portal';
import { ModalType, useAuthStore } from '../shared/store';
import Login from '../component/auth/Login';


const ModalTemplate: React.FC = () => {
  const modalType = useAuthStore((state) => state.modalType);
  const setModalType = useAuthStore((state) => state.setModalType);

  const renderModalContent = () => {
    switch (modalType) {
      case ModalType.LOGIN:
        return <Login />;
      default:
        return null;
    }
  };

  if (modalType === ModalType.NONE) return null;

  return (
    <Portal>
      <ModalOverlay onClick={() => setModalType(ModalType.NONE)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {renderModalContent()}
        </ModalContent>
      </ModalOverlay>
    </Portal>
  );
};


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.color_Alpha_02};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.color_White};
  padding: 20px;
  border-radius: 8px;
  width: 440px;
  //height은 각자 정해
`;

export default ModalTemplate;