import React from 'react';
import styled from 'styled-components';
import SearchBar from '../component/landing/SearchBar';
import Welcome from '../component/landing/Welcome';
import { useLoadingStore } from '../shared/store/loadingStore';
import Loading from '../shared/component/Loading';
import { useInitPage } from '../shared/hooks/useInitPage';
import SearchForgot from '../component/landing/SearchForgot';
// import { useHealthCheck } from '../shared/hooks/useHealthCheck';

const Landing: React.FC = () => {
  // useHealthCheck();
  useInitPage();
  const { isLoading } = useLoadingStore();

  return (
    <LandingContainer>
      <Loading isLoading={isLoading} />
      <Welcome />
      <SearchBar />
      <SearchForgot />
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
