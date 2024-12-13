import React from 'react';
import styled from 'styled-components';
import { useInitPage } from '../shared/hooks/useInitPage';
import NotYet from '../component/NotYet';


const Contact: React.FC = () => {
  useInitPage();

  return (
    <NotYet />
    // <ContactContainer>
    // </ContactContainer>
  );
}

export default Contact;


const ContactContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: calc(8vh) calc(6vw);

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;