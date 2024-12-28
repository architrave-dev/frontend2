import React from 'react';
import styled from 'styled-components';
import Portal from '../Portal';
import Login from '../component/auth/Login';
import Signin from '../component/auth/SignIn';
import { useModalStore } from './store/portal/modalStore';
import { ModalType } from './enum/EnumRepository';
import WorkImport from '../component/projectDetail/WorkImport';
import WorkListForDetail from '../component/projectDetail/WorkListForCreateDetail';
import { useModal } from './hooks/useModal';
import { useOriginImgStore } from './store/portal/originImgStore';

const ModalTemplate: React.FC = () => {
  const { closeModal } = useModal();
  const { modalType } = useModalStore();
  const { originUrl } = useOriginImgStore();

  const renderModalContent = () => {
    switch (modalType) {
      case ModalType.ORIGIN_IMG:
        return (
          <OriginImgContent onClick={closeModal}>
            <FullOriginImg src={originUrl} alt={"full screen size origin Img"} />
          </OriginImgContent>
        )
      case ModalType.WORK_STATION:
        return (
          <WorkStationOverlay onClick={closeModal}>
            <WorkStationContent onClick={(e) => e.stopPropagation()}>
              <WorkImport />
            </WorkStationContent>
          </WorkStationOverlay>
        )
      case ModalType.TEMP_WORK:
        return (
          <WorkStationOverlay onClick={closeModal}>
            <WorkStationContent onClick={(e) => e.stopPropagation()}>
              <WorkListForDetail />
            </WorkStationContent>
          </WorkStationOverlay>
        )
      case ModalType.SIGNIN:
        return (
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <Signin />
            </ModalContent>
          </ModalOverlay>
        )
      case ModalType.LOGIN:
        return (
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <Login />
            </ModalContent>
          </ModalOverlay>
        )
      default:
        return null;
    }
  };

  if (modalType === ModalType.NONE) return null;

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

const OriginImgContent = styled.div`
  position: fixed;
  top: calc(0px);
  // top: calc(1.4vh);
   /* 화면 가운데 정렬 */
  left: 50%;
  transform: translateX(-50%);

  width: 100vw;
  height: 100vh;
  // height: 97.2vh;

  display: flex;

  border: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.color_Alpha_04};
  backdrop-filter: blur(8px);
  padding: 2vw 1vw;
  overflow-y: scroll;
  z-index: 5; 
`;

const FullOriginImg = styled.img`
  width: 100%;
  height: auto; 
  object-fit: contain;
`;

export default ModalTemplate;