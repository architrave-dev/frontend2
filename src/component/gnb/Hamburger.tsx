import React from 'react';
import styled from 'styled-components';
import hamburger128 from '../../asset/gnb/hamburger_128.png';
import { useMenu } from '../../shared/hooks/useMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../asset/gnb/logo_small.png';
import { useSetting } from '../../shared/hooks/useApi/useSetting';
import { useAui } from '../../shared/hooks/useAui';

const Hamburger: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { aui } = useAui();
  const { isMenuOpen, openMenu, closeMenu } = useMenu();
  const { setting } = useSetting();

  const showGnb = () => {
    if (isMenuOpen)
      closeMenu();
    else
      openMenu();
  }
  const handleUsernameClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/${aui}/`);
  }
  if (location.pathname === '/') {
    return (
      <ServiceLogoContainer>
        <LogoImg src={logo} alt='toggle menu icon' />
        <ServiceName>Architrave</ServiceName>
      </ServiceLogoContainer>
    );
  }
  if (!setting) return null;
  return (
    <LogoComp onClick={showGnb}>
      <HamburgerComp src={hamburger128} alt='toggle menu icon' />
      <Username onClick={(e) => handleUsernameClick(e)}>
        {setting.pageName.toUpperCase()}
      </Username>
    </LogoComp>
  );
}


const LogoComp = styled.article`
  display: flex;
  align-items: center;
  gap: 1vw;
  z-index: 4;
`;

const HamburgerComp = styled.img`
  width: clamp(10px, 2.3vw, 20px);
  cursor: pointer;
`;

const Username = styled.div`
  white-space: nowrap;
  text-decoration: none;
  &:hover {
    text-decoration: ${({ theme }) => theme.fontWeight.decoration};
  }
  cursor: pointer;
  ${({ theme }) => theme.typography.Body_00_1};
`;


const ServiceLogoContainer = styled.article`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;

const ServiceName = styled.div`
  ${({ theme }) => theme.typography.Body_00_1};
`;

const LogoImg = styled.img`
  width: clamp(1.4rem, 4vw, 2.5rem);
  padding-bottom: 2px;
`;


export default Hamburger;