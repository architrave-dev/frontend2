import React from 'react';
import styled from 'styled-components';
import SearchBar from '../component/SearchBar';
import LandingLogo from '../component/LandingLogo';

const Landing: React.FC = () => {
  return (
    <LandingContainer>
      <LandingLogo />
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
