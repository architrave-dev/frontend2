import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Logo from './Logo'
import Navigation from './Navigation';
import User from './UserComp';

const Gnb: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <GnbSection>
      <Logo />
      <Navigation />
      <User />
    </GnbSection>
  );
}

const GnbSection = styled.section`
  position: absolute;
  top: 0px;
  z-index: 2;
  width: 100%;
  height: calc(10vh);
  max-height: 140px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 6vw;

  background-color: transparent;
  // background-color: #F6B99D;  /*for dev*/
`;

export default Gnb;