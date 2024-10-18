import React from 'react';
import styled from 'styled-components';

const Welcome: React.FC = () => {
  return (
    <WelcomContainer>
      <Slogan>
        Seamless Portfolio<br /> for Artist
        <br />
        Seamless Archive<br /> for Artist
      </Slogan>
    </WelcomContainer>
  );
};

const WelcomContainer = styled.header`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

const Slogan = styled.h1`
  text-align: left;
  ${({ theme }) => theme.typography.H_015};
`;


export default Welcome;
