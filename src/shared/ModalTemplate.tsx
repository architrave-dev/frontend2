import React from 'react';
import styled from 'styled-components';
import Portal from '../portal/Modal';
import Login from '../component/auth/Login';
import Register from '../component/auth/Register';
import { useModalStore } from './store/portal/modalStore';
import { ModalType } from './enum/EnumRepository';
import WorkImport from '../component/projectDetail/WorkImport';
import WorkListForDetail from '../component/projectDetail/WorkListForCreateDetail';
import ChangeModal from '../component/setting/ChangeModal';
import FullImageViewer from './component/FullImageViewer';
import EmailSend from '../component/contact/EmailSend';
import EmailVerification from '../component/auth/EmailVerification';
import Indexing from '../component/index/Indexing';
import ChangePWModal from '../component/setting/ChangePWModal';
import FindAuiModal from '../component/landing/FindAuiModal';
import FindPWModal from '../component/landing/FindPWModal';

const ModalTemplate: React.FC = () => {
  const { standardModal, clearModal } = useModalStore();

  if (!standardModal || standardModal.modalType === ModalType.NONE) return null;

  const renderModalContent = () => {
    switch (standardModal.modalType) {
      case ModalType.ORIGIN_IMG:
        return (
          <FullImageViewer />
        )
      case ModalType.INDEXING:
        return (
          <WorkStationOverlay onClick={clearModal}>
            <Indexing />
          </WorkStationOverlay>
        )
      case ModalType.WORK_STATION:
        return (
          <WorkStationOverlay onClick={clearModal}>
            <WorkImport />
          </WorkStationOverlay>
        )
      case ModalType.TEMP_WORK:
        return (
          <WorkStationOverlay onClick={clearModal}>
            <WorkListForDetail />
          </WorkStationOverlay>
        )
      case ModalType.CHANGE_PW:
        return (
          <ModalOverlayBrighter onClick={clearModal}>
            <ChangePWModal />
          </ModalOverlayBrighter>
        )
      case ModalType.CHANGE_STATION:
        return (
          <ModalOverlayBrighter onClick={clearModal}>
            <ChangeModal />
          </ModalOverlayBrighter>
        )
      case ModalType.FIND_AUI:
        return (
          <ModalOverlayBrighter onClick={clearModal}>
            <FindAuiModal />
          </ModalOverlayBrighter>
        )
      case ModalType.FIND_PW:
        return (
          <ModalOverlayBrighter onClick={clearModal}>
            <FindPWModal />
          </ModalOverlayBrighter>
        )
      case ModalType.LOGIN:
        return (
          <ModalOverlay onClick={clearModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <Login />
            </ModalContent>
          </ModalOverlay>
        )
      case ModalType.REGISTER:
        return (
          <ModalOverlay onClick={clearModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <Register />
            </ModalContent>
          </ModalOverlay>
        )
      case ModalType.VERIFICATION:
        return (
          <ModalOverlay onClick={clearModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <EmailVerification />
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


export default ModalTemplate;