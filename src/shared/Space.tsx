import React from 'react';
import styled from 'styled-components';

interface SpaceProps {
  children?: React.ReactNode;
}

const Space: React.FC<SpaceProps> = ({ children }) => {
  return (
    <SpaceComp>
      {children}
    </SpaceComp>
  );
}

const SpaceComp = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Space;