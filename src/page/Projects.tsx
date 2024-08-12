import React from 'react';
import styled from 'styled-components';
import LandingBox from '../component/LandingBox';
import ProjectSimple from '../component/project/ProjectSimple';
import projectImg from '../asset/project/starship.jpeg'
import Space from '../shared/Space';
import { useAuiValidation } from '../shared/hooks/useAuiValidation';
import { useEditMode } from '../shared/hooks/useEditMode';

const projectItems = [
  { idx: 0, title: "Project Title 1", description: "This is Project description.This is Project description.This is Project description." },
  { idx: 1, title: "Project Title 2", description: "This is Project description.This is Project description.This is Project description." },
  { idx: 2, title: "Project Title 3", description: "This is Project description.This is Project description.This is Project description." }
];


const Projects: React.FC = () => {
  const AUI = useAuiValidation();
  const { isEditMode, setEditMode } = useEditMode();

  const toggleEditMode = () => {
    setEditMode(!isEditMode);
  };


  return (
    <ProjectsPage>
      <button onClick={toggleEditMode}>
        임시 editmode 변경
      </button>
      <LandingBox />
      <Space />
      <ProjectSimpleList>
        {projectItems.map((each) => (
          <ProjectSimple
            key={each.idx}
            initialTitle={each.title}
            initialDescription={each.description}
            initialImage={projectImg}
            isEditMode={isEditMode}
          />
        ))}
      </ProjectSimpleList>
    </ProjectsPage>


  );
}
const ProjectsPage = styled.div`
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ProjectSimpleList = styled.section`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Projects;