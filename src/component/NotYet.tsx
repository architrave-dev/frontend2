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
  font-size: ${({ theme }) => theme.fontSize.font_H02};
  font-weight: ${({ theme }) => theme.fontWeight.semi_bold};
  
`


export default NotYet;