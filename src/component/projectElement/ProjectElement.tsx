import React from 'react';
import styled from 'styled-components';
import Work, { WorkProps } from './Work';
import TextBox, { TextBoxProps } from './TextBox';
import Divider, { DividerProps } from '../../shared/Divider';
import Work2 from './Work2';

export enum ProjectElementType {
  WORK = 'Work',
  TEXTBOX = 'TextBox',
  DIVIDER = 'Divider'
}

export type ProjectElementProps = {
  isEditMode: boolean;
  type: ProjectElementType;
  content: WorkProps | TextBoxProps | DividerProps;
};

const ProjectElement: React.FC<ProjectElementProps> = ({ isEditMode, type, content }) => {

  const contentRouter = () => {
    if (type === ProjectElementType.WORK) {
      return <Work {...(content as WorkProps)} />;
      // return <Work2 {...(content as WorkProps)} />;
    } else if (type === ProjectElementType.TEXTBOX) {
      return <TextBox {...(content as TextBoxProps)} />;
    } else if (type === ProjectElementType.DIVIDER) {
      return <Divider {...(content as DividerProps)} />;
    }
  }

  return (
    <ProjectElementListWrapper elementType={type}>
      {contentRouter()}
    </ProjectElementListWrapper>
  );
}

const ProjectElementListWrapper = styled.div<{ elementType: ProjectElementType }>`
  width: 100%;
  max-height: 100vh;
  padding: ${({ elementType }) => {
    switch (elementType) {
      case ProjectElementType.WORK:
        return null;
      default:
        return '0 calc(10vw)';
    }
  }};
  
  margin-bottom: ${({ elementType }) => {
    /* 각 Element를 순수하게 남기기 위해 여기서 설정 */
    switch (elementType) {
      case ProjectElementType.WORK:
        return 'calc(16vh)';
      case ProjectElementType.TEXTBOX:
        return 'calc(10vh)';
      case ProjectElementType.DIVIDER:
        return 'calc(4vh)';
      default:
        return 'calc(12vh)';
    }
  }};
`;

export default ProjectElement;
