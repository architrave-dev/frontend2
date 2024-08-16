import React from 'react';
import styled from 'styled-components';
import ProjectTitle from '../../component/projectDetail/ProjectTitle';
import Divider, { DividerType } from '../../shared/Divider';
import ProjectInfoList from '../../component/projectDetail/ProjectInfoList';


const ProjectDetailContainer: React.FC = () => {

  return (
    <ProjectDetailContainerComp>
      <ProjectTitle />
      <Divider dividerType={DividerType.PLAIN} />
      <ProjectInfoList />
    </ProjectDetailContainerComp>
  );
}

const ProjectDetailContainerComp = styled.section`
  padding: calc(8vh) calc(10vw);
`;

export default ProjectDetailContainer;