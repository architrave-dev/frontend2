import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';




const Navigation: React.FC = () => {
  const { aui } = useAui();
  const location = useLocation();

  const navItems = [
    { path: `/${aui}/projects`, label: 'Projects' },
    { path: `/${aui}/works`, label: 'Works' },
    { path: `/${aui}/about`, label: 'About' },
  ];

  return (
    <NavigationComp>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.path}>
            <StyledLink
              to={item.path}
              $isActive={location.pathname === item.path}
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
  font-size: ${({ theme }) => theme.fontSize.font_B01};
`;

const StyledLink = styled(Link) <{ $isActive: boolean }>`
  text-decoration: ${({ $isActive }) => $isActive ? 'underline' : 'none'};

  &:hover {
    text-decoration: ${({ theme }) => theme.fontWeight.decoration};
  }
`;

export default Navigation;