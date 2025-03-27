import React from 'react';
import styled from 'styled-components';


const NotYet: React.FC = () => {

  return (
    <NotYetComp>
      <div>In Preparation...</div>
    </NotYetComp>
  );
};

const NotYetComp = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.typography.H_02};
`


export default NotYet;