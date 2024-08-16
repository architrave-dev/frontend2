import React, { useState } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import ProjectElement from '../../component/projectElement/ProjectElement';


const ProjectElementList: React.FC = () => {
  const { isEditMode } = useEditMode();

  return (
    <ProjectElementListComp>
      {/* {projectDetailValue.elements.map((element, index) => (
        <ProjectElement
          key={index}
          type={element.type}
          content={element.content}
        />
      ))} */}
    </ProjectElementListComp>
  );
}

const ProjectElementListComp = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 120px;
  padding: 0 calc(10vw);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ProjectElementList;