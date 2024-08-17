import React from 'react';
import styled from 'styled-components';
import Work, { WorkProps } from './Work';
import TextBox, { TextBoxProps } from './TextBox';
import Divider, { DividerProps, DividerType } from '../../shared/Divider';
import Work2 from './Work2';
import { TextBoxAlignment, TextBoxData, WorkAlignment, WorkData } from '../../shared/store/projectStore';

export enum ProjectElementType {
  WORK = 'WORK',
  TEXTBOX = 'TEXTBOX',
  DIVIDER = 'DIVIDER'
}

export type ProjectElementProps = {
  id: string;
  projectElementType: ProjectElementType;
  // order: string;
  work: WorkData | null;
  workAlignment: WorkAlignment | null;
  textBox: TextBoxData | null;
  textBoxAlignment: TextBoxAlignment | null;
  dividerType: DividerType | null;
};

const ProjectElement: React.FC<ProjectElementProps> = ({
  id,
  projectElementType,
  // order,
  work,
  workAlignment,
  textBox,
  textBoxAlignment,
  dividerType
}) => {
  const contentRouter = () => {
    switch (projectElementType) {
      case ProjectElementType.WORK:
        return work && <Work alignment={workAlignment} data={work} />;
      case ProjectElementType.TEXTBOX:
        return textBox && <TextBox alignment={textBoxAlignment} data={textBox} />;
      case ProjectElementType.DIVIDER:
        return dividerType && <Divider dividerType={dividerType} />;
      default:
        return null;
    }
  }

  return (
    <ProjectElementListWrapper $elementType={projectElementType}>
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
