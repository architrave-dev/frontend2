import React from 'react';
import styled from 'styled-components';
import SearchBar from '../component/SearchBar';
import LandingLogo from '../component/LandingLogo';
import Space from '../shared/Space';

const Landing: React.FC = () => {
  return (
    <LandingContainer>
      <LandingLogo />
      <Space />
      <SearchBar />
    </LandingContainer>
  );
}

const LandingContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Landing;
