import React from 'react';
import styled from 'styled-components';
import Work from './Work';
import TextBox from './TextBox';
import Divider from '../../shared/Divider';
import { useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { ProjectElementType } from '../../shared/enum/EnumRepository';
import { ProjectElementData } from '../../shared/dto/EntityRepository';
import { RemoveProjectElementReq } from '../../shared/dto/ReqDtoRepository';
import Document from './Document';



const ProjectElement: React.FC<ProjectElementData> = ({
  id, //projectElementId
  projectElementType,
  work,
  workAlignment,
  workDisplaySize,
  textBox,
  textBoxAlignment,
  document,
  documentAlignment,
  dividerType
  // order,
}) => {
  const { isEditMode } = useEditMode();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { updatedProjectElements, setUpdatedProjectElements, removedProjectElements, setRemovedProjectElements } = useProjectElementListStoreForUpdate();
  const contentRouter = () => {
    switch (projectElementType) {
      case ProjectElementType.WORK:
        return work && <Work alignment={workAlignment} displaySize={workDisplaySize} data={work} />;
      case ProjectElementType.TEXTBOX:
        return textBox && <TextBox alignment={textBoxAlignment} data={textBox} />;
      case ProjectElementType.DOCUMENT:
        return document && <Document alignment={documentAlignment} data={document} />;
      case ProjectElementType.DIVIDER:
        return dividerType && <Divider dividerType={dividerType} />;
      default:
        return null;
    }
  }

  const handleDelete = () => {
    const targetElement = updatedProjectElements.find(each => each.projectElementId === id);
    if (targetElement) {
      const updatedInfoList = updatedProjectElements.filter((each) => each.projectElementId !== id)
      setUpdatedProjectElements(updatedInfoList);
    }

    const updatedProjectInfoList = projectElementList.filter((each) => each.id !== id)
    setProjectElementList(updatedProjectInfoList);

    const newRemovedElement: RemoveProjectElementReq = { projectElementId: id };
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
