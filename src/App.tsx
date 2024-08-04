import React from 'react';
import styled from 'styled-components';

const App: React.FC = () => {
  return (
    <AppComp className="App">
    </AppComp>
  );
}


const AppComp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FAF0E4;  /*for dev*/
`;

export default App;
