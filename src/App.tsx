import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Gnb from './component/gnb/Gnb';
import Landing from './page/Landing';
import Projects from './page/Projects';
import ProjectDetail from './page/ProjectDetail';
import Works from './page/Works';
import About from './page/About';
import ErrorPage from './page/Error';
import { useGlobalError } from './shared/hooks/useGlobalError';

const App: React.FC = () => {
  useGlobalError();
  return (
    <AppComp className="App">
      <Router>
        <Gnb />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/:AUI" element={<Projects />} />
          <Route path="/:AUI/projects" element={<Projects />} />
          <Route path="/:AUI/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/:AUI/works" element={<Works />} />
          <Route path="/:AUI/about" element={<About />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </AppComp>
  );
}


const AppComp = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: #FAF0E4;  /*for dev*/
`;

export default App;
