import React from 'react';
import styled from 'styled-components';
import ProjectSimple from '../component/project/ProjectSimple';


const projectItems = [
  { idx: 0, title: "Project Title 1", description: "This is Project description.This is Project description.This is Project description." },
  { idx: 1, title: "Project Title 2", description: "This is Project description.This is Project description.This is Project description." },
  { idx: 2, title: "Project Title 3", description: "This is Project description.This is Project description.This is Project description." }
];


const Projects: React.FC = () => {
  return (
    <ProjectSimpleList>
      {projectItems.map((each) => (
        <ProjectSimple key={each.idx} title={each.title} description={each.description} />
      ))}
    </ProjectSimpleList>

  );
}

const ProjectSimpleList = styled.section`
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Projects;
