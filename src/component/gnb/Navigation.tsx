import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const navItems = [
  { path: '/projects', label: 'Projects' },
  { path: '/works', label: 'Works' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];


const Navigation: React.FC = () => {
  return (
    <NavigationComp>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.path}>
            <StyledLink to={item.path}>{item.label}</StyledLink>
          </NavItem>
        ))}
      </NavList>
    </NavigationComp>
  );
}

const NavigationComp = styled.nav`
  width: calc(50vw);
  
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
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Navigation;