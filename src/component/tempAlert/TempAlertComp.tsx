import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import confirmIcon from '../../asset/icon/confirm.png';
import { useTempAlertStore } from '../../shared/store/portal/tempAlertStore';


const TempAlertComp: React.FC = () => {
  const { tempAlert, clearTempAlert } = useTempAlertStore();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (tempAlert?.duration) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(clearTempAlert, 300);
      }, tempAlert.duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [tempAlert, clearTempAlert]);

  if (tempAlert === null) return null;

  return (
    <TempAlertContent
      $isClosing={isClosing}
    >
      <Icon src={confirmIcon} alt='confirm icon' />
      <Content>{tempAlert.content}</Content>
    </TempAlertContent>
  );
};


const Icon = styled.img`
  width: 1.2vw;
  height: 1.2vw;
  `;
const Content = styled.div`
    ${({ theme }) => theme.typography.Body_03_2};
  `;


const TempAlertContent = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  right: 2vw;
  bottom: ${({ theme }) => theme.tempAlert?.position || '24px'};
  transform: ${({ $isClosing }) =>
    $isClosing
      ? 'translateY(100%)'
      : 'translateY(0)'
  };
  display: flex;
  align-items: center;
  gap: 1vw;
  min-width: 18vw;
  min-height: 50px;
  width: fit-content;
  height: fit-content;
  outline: none;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  border-radius: 2px;
  backdrop-filter: blur(4px);
  background-color: ${({ theme }) => theme.colors.color_Alpha_04};
  
  opacity: ${({ $isClosing }) => ($isClosing ? 0 : 1)};
  transition: all 0.4s ease-out;
  animation: slideIn 0.5s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  `;

export default TempAlertComp;