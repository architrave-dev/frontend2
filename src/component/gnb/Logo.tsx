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
  margin: 0 20px 0 20px;
`;

const LogoImg = styled.img`
  width: calc(14vw);
`;

export default Logo;