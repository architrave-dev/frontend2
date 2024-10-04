import React from 'react';
import styled from 'styled-components';
import MemberInfo from '../component/about/MemberInfo';
import CareerList from '../component/about/CareerList';

const About: React.FC = () => {
  return (
    <AboutContainer>
      <MemberInfo />
      <CareerList />
    </AboutContainer>
  );
}

export default About;


const AboutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;