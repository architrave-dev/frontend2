import React, { useEffect } from 'react';
import styled from 'styled-components';
import LandingBox from '../component/LandingBox';
import ProjectSimple from '../component/project/ProjectSimple';
import projectImg from '../asset/project/starship.jpeg'
import Space from '../shared/Space';
import { useParams } from 'react-router-dom';
import { useAuiValidation } from '../shared/hooks/useAuiValidation';
import { useAuth } from '../shared/hooks/useAuth';
import { useAui } from '../shared/hooks/useAui';

const projectItems = [
  { idx: 0, title: "Project Title 1", description: "This is Project description.This is Project description.This is Project description." },
  { idx: 1, title: "Project Title 2", description: "This is Project description.This is Project description.This is Project description." },
  { idx: 2, title: "Project Title 3", description: "This is Project description.This is Project description.This is Project description." }
];


const Projects: React.FC = () => {
  const { AUI } = useParams<{ AUI: string }>();
  useAuiValidation(AUI);

  // const { user } = useAuth();
  // const { aui } = useAui();

  // useEffect(() => {
  //   console.log("user: ", user);
  //   console.log("Owner aui: ", aui);
  // }, [user, aui]);


  return (
    <ProjectsPage>
      <LandingBox />
      <Space />
      <ProjectSimpleList>
        {projectItems.map((each) => (
          <ProjectSimple
            key={each.idx}
            initialTitle={each.title}
            initialDescription={each.description}
            initialImage={projectImg}
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