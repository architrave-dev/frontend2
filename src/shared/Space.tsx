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
  height: ${({ $height }) => $height !== undefined ? $height : '50px'};
  display: flex;
  justify-content: ${({ $align }) => $align !== undefined ? $align : 'center'};
  align-items: center;

  padding: 20px 0px;
`

export default Space;