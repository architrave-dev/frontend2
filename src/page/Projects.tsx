import React from 'react';
import styled from 'styled-components';
import LandingBox from '../component/project/LandingBox';
import ProjectList from '../component/project/ProjectList';
import { useInitPage } from '../shared/hooks/useInitPage';


const Projects: React.FC = () => {
  useInitPage();

  return (
    <ProjectsPage>
      <LandingBox />
      <ProjectList />
    </ProjectsPage>
  );
}
const ProjectsPage = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default Projects;