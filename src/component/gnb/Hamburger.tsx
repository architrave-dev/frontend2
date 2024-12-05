import React from 'react';
import styled from 'styled-components';
import hamburger128 from '../../asset/gnb/hamburger_128.png';
import { useMenu } from '../../shared/hooks/useMenu';
import { extractUsernameFromAui } from '../../shared/hooks/useApi/useAuth';
import { useAui } from '../../shared/hooks/useAui';

const Hamburger: React.FC = () => {
  const { aui } = useAui();
  const { isMenuOpen, openMenu, closeMenu } = useMenu();

  const showGnb = () => {
    if (isMenuOpen)
      closeMenu();
    else
      openMenu();
  }
  return (
    <LogoComp onClick={showGnb}>
      <LogoImg src={hamburger128} alt='toggle menu icon' />
      <Username>
        {extractUsernameFromAui(aui)}
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

const LogoImg = styled.img`
  width: calc(1.2vw);
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

export default Hamburger;