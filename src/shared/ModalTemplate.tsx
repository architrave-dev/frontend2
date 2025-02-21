import React from 'react';
import styled from 'styled-components';
import Portal from '../portal/Modal';
import Login from '../component/auth/Login';
import Signin from '../component/auth/SignIn';
import { useModalStore } from './store/portal/modalStore';
import { ModalType } from './enum/EnumRepository';
import WorkImport from '../component/projectDetail/WorkImport';
import WorkListForDetail from '../component/projectDetail/WorkListForCreateDetail';
import ChangeModal from '../component/setting/ChangeModal';
import FullImageViewer from './component/FullImageViewer';
import EmailSend from '../component/contact/EmailSend';

const ModalTemplate: React.FC = () => {
  const { standardModal, clearModal } = useModalStore();

  if (!standardModal || standardModal.modalType === ModalType.NONE) return null;

  const renderModalContent = () => {
    switch (standardModal.modalType) {
      case ModalType.ORIGIN_IMG:
        return (
          <FullImageViewer />
        )
      case ModalType.WORK_STATION:
        return (
          <WorkStationOverlay onClick={clearModal}>
            <WorkStationContent onClick={(e) => e.stopPropagation()}>
              <WorkImport />
            </WorkStationContent>
          </WorkStationOverlay>
        )
      case ModalType.TEMP_WORK:
        return (
          <WorkStationOverlay onClick={clearModal}>
            <WorkStationContent onClick={(e) => e.stopPropagation()}>
              <WorkListForDetail />
            </WorkStationContent>
          </WorkStationOverlay>
        )
      case ModalType.CHANGE_STATION:
        return (
          <ModalOverlayBrighter onClick={clearModal}>
            <ModalContentBlur onClick={(e) => e.stopPropagation()}>
              <ChangeModal />
            </ModalContentBlur>
          </ModalOverlayBrighter>
        )
      case ModalType.SIGNIN:
        return (
          <ModalOverlay onClick={clearModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <Signin />
            </ModalContent>
          </ModalOverlay>
        )
      case ModalType.LOGIN:
        return (
          <ModalOverlay onClick={clearModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <Login />
            </ModalContent>
          </ModalOverlay>
        )
      case ModalType.EMAIL_SEND:
        return (
          <ModalOverlay onClick={clearModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <EmailSend />
            </ModalContent>
          </ModalOverlay>
        )
      default:
        return null;
    }
  };

  return (
    <Portal>
      {renderModalContent()}
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

const ModalOverlayBrighter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.color_Alpha_03};
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 5; 
`;

const ModalContentBlur = styled.div`
  background-color: ${({ theme }) => theme.colors.color_Alpha_04};
  padding: 20px;
  width: 440px;
  border-radius: 2px;
  backdrop-filter: blur(4px);
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.color_White};
  padding: 20px;
  border-radius: 8px;
  width: 440px;
  //height은 각자 정해
`;

const WorkStationOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;

  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const WorkStationContent = styled.div`
  position: absolute;
  left: 6vw;

  background-color: ${({ theme }) => theme.colors.color_White};
  padding: 20px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  width: 230px;
  //height은 각자 정해
`;

export default ModalTemplate;