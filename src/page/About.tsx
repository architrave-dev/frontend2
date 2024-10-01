import React from 'react';
import styled from 'styled-components';
import CareerList from '../component/about/CareerList';
import ArtistCard from '../component/about/ArtistCard';

const About: React.FC = () => {
  return (
    <AboutContainer>
      <CareerList />
    </AboutContainer>
  );
}

export default About;


const AboutContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;