import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import hamburger128 from '../../asset/gnb/hamburger_128.png';

const Logo: React.FC = () => {
  return (
    <StyledLink to="/">
      <LogoComp>
        <LogoImg src={hamburger128} alt='toggle menu icon' />
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
  width: calc(1.2vw);
`;

export default Logo;