import React from 'react';
import styled from 'styled-components';
import Work from './Work';
import TextBox from './TextBox';
import Divider from '../../shared/Divider';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { ProjectElementType } from '../../shared/enum/EnumRepository';
import { ProjectElementData } from '../../shared/dto/EntityRepository';
import Document from './Document';
import Detail from './Detail';

export interface ProjectElementProps {
  data: ProjectElementData;
}

const ProjectElement: React.FC<ProjectElementProps> = ({ data }) => {
  const { isEditMode } = useEditMode();

  const contentRouter = () => {
    switch (data.projectElementType) {
      case ProjectElementType.WORK:
        return data.work && data.displayAlignment && data.displaySize && <Work peId={data.id} alignment={data.displayAlignment} displaySize={data.displaySize} data={data.work} />;
      case ProjectElementType.DETAIL:
        return data.workDetail && data.displayAlignment && data.displaySize && <Detail peId={data.id} alignment={data.displayAlignment} displaySize={data.displaySize} data={data.workDetail} />;
      case ProjectElementType.TEXTBOX:
        return data.textBox && data.textAlignment && <TextBox peId={data.id} alignment={data.textAlignment} data={data.textBox} />;
      case ProjectElementType.DOCUMENT:
        return data.document && data.textAlignment && <Document peId={data.id} alignment={data.textAlignment} data={data.document} />;
      case ProjectElementType.DIVIDER:
        return data.dividerType && <Divider dividerType={data.dividerType} />;
      default:
        return null;
    }
  }

  const handleDelete = () => {
    // const targetElement = projectElementList.find(each => each.id === data.id);
    // if (targetElement) {
    //   const updatedInfoList = projectElementList.filter((each) => each.id !== data.id)
    //   setProjectElementList(updatedInfoList);
    // }

    // const updatedProjectInfoList = projectElementList.filter((each) => each.id !== data.id)
    // setProjectElementList(updatedProjectInfoList);

    // const newRemovedElement: RemoveProjectElementReq = { projectElementId: data.id };
    // setRemovedProjectElements([...removedProjectElements, newRemovedElement]);
  }

  return (
    <ProjectElementListWrapper $elementType={data.projectElementType}>
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
      case ProjectElementType.DETAIL:
      case ProjectElementType.DOCUMENT:
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
