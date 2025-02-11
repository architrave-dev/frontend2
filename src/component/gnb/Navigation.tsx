import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useMenu } from '../../shared/hooks/useMenu';
import { useCheckLoginOwner } from '../../shared/hooks/useCheckLoginOwner';
import { useSetting } from '../../shared/hooks/useApi/useSetting';


const Navigation: React.FC = () => {
  const { aui } = useAui();
  const { setting, getSetting } = useSetting();
  const { isLoggedInOwner } = useCheckLoginOwner();
  const location = useLocation();
  const { isMenuOpen, closeMenu } = useMenu();

  useEffect(() => {
    const getSettingWithApi = async () => {
      if (!aui) return;
      console.log("getting setting...")
      await getSetting(aui);
    }
    getSettingWithApi();
  }, [aui]);

  if (!setting) return null;

  const navItems = [
    { path: `/${aui}/projects`, label: 'Projects', isVisible: setting.menuVisible.projects },
    { path: `/${aui}/works`, label: 'Works', isVisible: setting.menuVisible.works },
    { path: `/${aui}/about`, label: 'About', isVisible: setting.menuVisible.about },
    { path: `/${aui}/contact`, label: 'Contact', isVisible: setting.menuVisible.contact },
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
        {navItems.map((item) =>
          item.isVisible && (
            <NavItem key={item.path}>
              <StyledLink
                to={item.path}
                $isActive={location.pathname === item.path}
                $isMenuOpen={isMenuOpen}
                onClick={(e) => handleLinkClick(e)}>
                {item.label}
              </StyledLink>
            </NavItem>
          )
        )}
        {isLoggedInOwner() &&
          <NavItem>
            <StyledLink
              to={`/${aui}/settings`}
              $isActive={location.pathname === `/${aui}/settings`}
              $isMenuOpen={isMenuOpen}
              onClick={(e) => handleLinkClick(e)}
            >{"Settings"}</StyledLink>
          </NavItem>
        }
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