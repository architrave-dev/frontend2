import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useMenu } from '../../shared/hooks/useMenu';


const Navigation: React.FC = () => {
  const { aui } = useAui();
  const location = useLocation();
  const { isMenuOpen, closeMenu } = useMenu();

  const navItems = [
    { path: `/${aui}/projects`, label: 'Projects' },
    { path: `/${aui}/works`, label: 'Works' },
    { path: `/${aui}/about`, label: 'About' },
    { path: `/${aui}/contact`, label: 'Contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isMenuOpen) {
      e.preventDefault();
    } else {
      closeMenu();
    }
  };

  return (
    <NavigationComp>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.path}>
            <StyledLink
              to={item.path}
              $isActive={location.pathname === item.path}
              $isMenuOpen={isMenuOpen}
              onClick={(e) => handleLinkClick(e)}
            >{item.label}</StyledLink>
          </NavItem>
        ))}
      </NavList>
    </NavigationComp>
  );
}

const NavigationComp = styled.nav`
  width: calc(60vw);
  
  display: flex;
  align-items: center;

`;
const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 20px;
  ${({ theme }) => theme.typography.Body_01_2};
`;

const StyledLink = styled(Link) <{ $isActive: boolean; $isMenuOpen: boolean; }>`
  text-decoration: ${({ $isActive }) => $isActive ? 'underline' : 'none'};
  &:hover {
    text-decoration: ${({ theme }) => theme.fontWeight.decoration};
    }
  cursor: ${({ $isMenuOpen }) => $isMenuOpen ? 'pointer' : 'not-allowed'};
`;

export default Navigation;