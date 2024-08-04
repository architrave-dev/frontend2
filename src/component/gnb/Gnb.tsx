import React from 'react';
import styled from 'styled-components'
import Logo from './Logo'
import Navigation from './Navigation';
import User from './User';

const Gnb: React.FC = () => {
  return (
    <GnbSection>
      <Logo />
      <Navigation />
      <User />
    </GnbSection>
  );
}

const GnbSection = styled.section`
  width: 100%;
  height: calc(10vh);
  max-height: 140px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 100px 0px 100px;

  background-color: #F6B99D;  /*for dev*/
`;

export default Gnb;