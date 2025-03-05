import React from 'react';
import styled from 'styled-components';

interface SpaceProps {
  children?: React.ReactNode;
  $align?: string;
  $height?: string;
}

const Space: React.FC<SpaceProps> = ({ children, $align, $height }) => {
  return (
    <SpaceComp $align={$align} $height={$height} >
      {children}
    </SpaceComp>
  );
}

const SpaceComp = styled.div<{ $align?: string, $height?: string }>`
  width: 100%;
  height: ${({ $height }) => $height !== undefined ? $height : '5vh'};
  display: flex;
  flex-direction: column;
  justify-content: ${({ $align }) => $align !== undefined ? $align : 'center'};
  align-items: center;
  gap: 0.5vw;
`

export default Space;