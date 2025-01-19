import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useAui } from '../../shared/hooks/useAui';
import { BtnConfirm, BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { ProjectElementType } from '../../shared/enum/EnumRepository';
import { ProjectElementData } from '../../shared/dto/EntityRepository';
import { useProjectElementListStore } from '../../shared/store/projectElementStore';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import Work from './Work';
import Detail from './Detail';
import Document from './Document';
import TextBox from './TextBox';
import Divider from '../../shared/Divider';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';

export interface ProjectElementProps {
  data: ProjectElementData;
}

const ProjectElement: React.FC<ProjectElementProps> = ({ data }) => {
  const { aui } = useAui();
  const { isEditMode } = useEditMode();
  const { updateProjectElement, deleteProjectElement } = useProjectElement();
  const { afterDeleteProjectElement } = useProjectElementListStore();

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

  const handleUpdate = async () => {
    // try {
    //   await updateProjectElement(aui, data);
    // } catch (err) {
    // }
  };

  const handleDelete = async () => {
    try {
      await deleteProjectElement(aui, { projectElementId: data.id });
      afterDeleteProjectElement(data.id);
    } catch (err) {
    }
  }

  return (
    <ProjectElementListWrapper $elementType={data.projectElementType}>
      {contentRouter()}
      {isEditMode &&
        <BtnContainer>
          {data.hasChanged &&
            <HeadlessBtn
              value={"Update"}
              handleClick={handleUpdate}
              StyledBtn={BtnConfirm}
            />
          }
          <HeadlessBtn
            value={"Delete"}
            handleClick={handleDelete}
            StyledBtn={BtnDelete}
          />
        </BtnContainer>
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

const BtnContainer = styled.div`
  position: absolute;
  right: 0px;
  width: fit-content;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5vw;

  padding: 4px 0px;
`


export default ProjectElement;