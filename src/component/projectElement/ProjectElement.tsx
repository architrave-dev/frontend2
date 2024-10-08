import React from 'react';
import styled from 'styled-components';
import Work from './Work';
import TextBox from './TextBox';
import Divider, { DividerType } from '../../shared/Divider';
import { ProjectElementType, RemoveProjectElementReq, TextBoxData, WorkData, useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { TextBoxAlignment, WorkAlignment } from '../../shared/component/SelectBox';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';


export type ProjectElementProps = {
  id: string;
  projectElementType: ProjectElementType;
  work: WorkData | null;
  workAlignment: WorkAlignment | null;
  textBox: TextBoxData | null;
  textBoxAlignment: TextBoxAlignment | null;
  dividerType: DividerType | null;
  // order: string;
};

const ProjectElement: React.FC<ProjectElementProps> = ({
  id, //projectElementId
  projectElementType,
  work,
  workAlignment,
  textBox,
  textBoxAlignment,
  dividerType
  // order,
}) => {
  const { isEditMode } = useEditMode();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { updatedProjectElements, setUpdatedProjectElements, removedProjectElements, setRemovedProjectElements } = useProjectElementListStoreForUpdate();
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

  const handleDelete = () => {
    const targetElement = updatedProjectElements.find(each => each.id === id);
    if (targetElement) {
      const updatedInfoList = updatedProjectElements.filter((each) => each.id !== id)
      setUpdatedProjectElements(updatedInfoList);
    }

    const updatedProjectInfoList = projectElementList.filter((each) => each.id !== id)
    setProjectElementList(updatedProjectInfoList);

    const newRemovedElement: RemoveProjectElementReq = { id: id };
    setRemovedProjectElements([...removedProjectElements, newRemovedElement]);
  }

  return (
    <ProjectElementListWrapper $elementType={projectElementType}>
      {contentRouter()}
      {isEditMode &&
        <HeadlessBtn
          value={"Delete"}
          handleClick={handleDelete}
          StyledBtn={BtnDelete}
        />
      }
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

export default ProjectElement;
