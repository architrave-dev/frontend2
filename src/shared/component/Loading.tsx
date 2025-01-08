import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <LoadingOverlay isVisible={isLoading}>
      <Wave>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Wave>
    </LoadingOverlay>
  );
};

const LoadingOverlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(235, 235, 235, 0.1);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  // /* 불투명도와 트랜지션 */
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.4s ease-in-out;

  pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
`;

const waveAnimation = keyframes`
  0%, 40%, 100% { transform: scaleY(1); }
  20% { transform: scaleY(0.7); }
`;

const Wave = styled.div`
  display: flex;
  align-items: center;

  div {
    width: 7px;
    height: 30px;
    background-color: black;
    margin: 0 2px;
    animation: ${waveAnimation} 1s ease-in-out infinite;

    &:nth-child(1) {
      animation-delay: -0.4s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.2s;
    }
    &:nth-child(4) {
      animation-delay: -0.1s;
    }
    &:nth-child(5) {
      animation-delay: 0s;
    }
  }
`;


export default Loading;