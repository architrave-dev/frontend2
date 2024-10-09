import React from 'react';
import styled from 'styled-components';
import LandingBox from '../component/project/LandingBox';
import ProjectList from '../component/project/ProjectList';
import { useInitializePage } from '../shared/hooks/useInitializePage';


const Projects: React.FC = () => {
  useInitializePage();

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