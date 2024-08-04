import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Gnb from './component/gnb/Gnb';
import Landing from './page/Landing';
import Projects from './page/Projects';
import About from './page/About';

const App: React.FC = () => {
  return (
    <AppComp className="App">
      <Router>
        <Gnb />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
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
