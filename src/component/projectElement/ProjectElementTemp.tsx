import React from 'react';
import styled from 'styled-components';
import WorkTemp from './WorkTemp';
import TextBoxTemp from './TextBoxTemp';
import { DividerType } from '../../shared/Divider';
import { CreateTextBoxReq, CreateWorkReq, ProjectElementType, TextBoxAlignment, WorkAlignment, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import DividerTemp from './DividerTemp';


export type ProjectElementTempProps = {
  tempId: string;
  projectId: string;
  projectElementType: ProjectElementType;
  work: CreateWorkReq | null;
  workAlignment: WorkAlignment | null;
  textBox: CreateTextBoxReq | null;
  textBoxAlignment: TextBoxAlignment | null;
  dividerType: DividerType | null;
  // order: string;
};

const ProjectElementTemp: React.FC<ProjectElementTempProps> = ({
  tempId,
  projectElementType,
  work,
  workAlignment,
  textBox,
  textBoxAlignment,
  dividerType
}) => {
  const { createdProjectElements, setCreatedProjectElements } = useProjectElementListStoreForUpdate();
  const contentRouter = () => {
    switch (projectElementType) {
      case ProjectElementType.WORK:
        return work && <WorkTemp tempId={tempId} alignment={workAlignment} data={work} />;
      case ProjectElementType.TEXTBOX:
        return textBox && <TextBoxTemp tempId={tempId} alignment={textBoxAlignment} data={textBox} />;
      case ProjectElementType.DIVIDER:
        return dividerType && <DividerTemp tempId={tempId} dividerType={dividerType} />;
      default:
        return null;
    }
  }
  const handleDelete = () => {
    const filteredList = createdProjectElements.filter((each) => each.tempId !== tempId);
    setCreatedProjectElements(filteredList);
  };

  return (
    <ProjectElementListWrapper $elementType={projectElementType}>
      {contentRouter()}
      <DeleteButton onClick={handleDelete}>
        Delete
      </DeleteButton>
    </ProjectElementListWrapper>
  );
}

const ProjectElementListWrapper = styled.div<{ $elementType: ProjectElementType }>`
  position: relative;
  width: 100%;
  padding: ${({ $elementType }) => {
    switch ($elementType) {
      case ProjectElementType.TEXTBOX:
        return '0 calc(10vw)';
      default:
        return null;
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

const DeleteButton = styled.button`
  height: 32px;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.color_Gray_02};
  color: ${({ theme }) => theme.colors.color_White};
  cursor: pointer;
  &:disabled {
    background-color: ${({ theme }) => theme.colors.color_Gray_04};
    cursor: not-allowed;
  }
`;

export default ProjectElementTemp;
