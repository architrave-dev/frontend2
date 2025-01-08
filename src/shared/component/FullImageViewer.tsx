import React from "react";
import styled from "styled-components";
import HeadlessBtn from './headless/button/HeadlessBtn';
import { BtnWorkViewer } from './headless/button/BtnBody';
import ZoomableImage from './ZoomableImage';
import { useModalStore } from '../store/portal/modalStore';



const FullImageViewer: React.FC = () => {
  const { standardModal, clearModal } = useModalStore();

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!standardModal?.value) return;

    const link = document.createElement('a');
    link.href = standardModal.value;
    const filename = standardModal.value.split('/').pop() || 'download.jpg';
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  return (
    <FullImageViewerLayer onClick={clearModal}>
      <BtnContainer>
        <HeadlessBtn
          value={"D"}
          handleClick={handleDownload}
          StyledBtn={BtnWorkViewer}
        />
        <HeadlessBtn
          value={"E"}
          handleClick={clearModal}
          StyledBtn={BtnWorkViewer}
        />
      </BtnContainer>
      <ZoomableImage imageUrl={standardModal!.value!} />
    </FullImageViewerLayer>
  );
};

export default FullImageViewer;


const FullImageViewerLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.color_Alpha_04};
  backdrop-filter: blur(8px);
  z-index: 5;

  overflow-y: auto;
`;

const BtnContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1vh;
`