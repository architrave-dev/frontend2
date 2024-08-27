import React from 'react';
import styled from 'styled-components';
import logo from '../asset/gnb/logo.png';

const LandingLogo: React.FC = () => {
  return (
    <MainLogoContainer>
      <MainLogo src={logo} alt="architrave_main_logo" />
    </MainLogoContainer>
  );
};

const MainLogoContainer = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const MainLogo = styled.img`
  width: 400px;
  height: auto;
`;


export default LandingLogo;
