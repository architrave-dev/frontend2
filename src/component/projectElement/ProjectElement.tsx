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
  type: ProjectElementType;
  content: WorkProps | TextBoxProps | DividerProps;
};

const ProjectElement: React.FC<ProjectElementProps> = ({ type, content }) => {
  const contentRouter = () => {
    switch (type) {
      case ProjectElementType.WORK:
        return <Work {...(content as WorkProps)} />;
      case ProjectElementType.TEXTBOX:
        return <TextBox {...(content as TextBoxProps)} />;
      case ProjectElementType.DIVIDER:
        return <Divider {...(content as DividerProps)} />;
      default:
        return null;
    }
  }

  return (
    <ProjectElementListWrapper $elementType={type}>
      {contentRouter()}
    </ProjectElementListWrapper>
  );
}

const ProjectElementListWrapper = styled.div<{ $elementType: ProjectElementType }>`
  width: 100%;
  padding: ${({ $elementType }) => {
    switch ($elementType) {
      case ProjectElementType.WORK:
        return null;
      default:
        return '0 calc(10vw)';
    }
  }};
  
  margin-bottom: ${({ $elementType }) => {
    /* 각 Element를 순수하게 남기기 위해 여기서 설정 */
    switch ($elementType) {
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
