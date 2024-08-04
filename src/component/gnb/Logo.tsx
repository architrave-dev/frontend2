import React from 'react';
import styled from 'styled-components';
import logo from '../../asset/gnb/logo.png';

const Logo: React.FC = () => {
  return (
    <LogoComp>
      <LogoImg src={logo} alt='architrave_logo' />
    </LogoComp>
  );
}

const LogoComp = styled.article`
  display: flex;
  align-items: center;
  margin: 0 20px 0 20px;
`;

const LogoImg = styled.img`
  width: calc(10vw);
`;

export default Logo;