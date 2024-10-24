import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../asset/gnb/logo.png';

const Logo: React.FC = () => {
  return (
    <StyledLink to="/">
      <LogoComp>
        <LogoImg src={logo} alt='architrave_logo' />
      </LogoComp>
    </StyledLink>
  );
}
const StyledLink = styled(Link)`
`;

const LogoComp = styled.article`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  width: calc(12vw);
`;

export default Logo;