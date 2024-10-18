import React from 'react';
import styled from 'styled-components';
import SearchBar from '../component/landing/SearchBar';
import Welcome from '../component/landing/Welcome';

const Landing: React.FC = () => {
  return (
    <LandingContainer>
      <Welcome />
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
