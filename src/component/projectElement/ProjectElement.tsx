import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useAui } from '../../shared/hooks/useAui';
import { BtnConfirm, BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { ProjectElementType, ServiceType } from '../../shared/enum/EnumRepository';
import { useProjectElementListStore } from '../../shared/store/projectElementStore';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import { convertPeToUpdateReq } from '../../shared/converter/converter';
import { UpdateDocumentReq, UpdateProjectElementReq, UpdateWorkDetailReq, UpdateWorkReq } from '../../shared/dto/ReqDtoRepository';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { ProjectElementData } from '../../shared/dto/EntityRepository';
import Work from './Work';
import Detail from './Detail';
import Document from './Document';
import TextBox from './TextBox';
import Divider from '../../shared/Divider';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { useImage } from '../../shared/hooks/useApi/useImage';
export interface ProjectElementProps {
  data: ProjectElementData;
}

const ProjectElement: React.FC<ProjectElementProps> = ({ data }) => {
  const { aui } = useAui();
  const { isEditMode } = useEditMode();
  const { project } = useProjectDetail();
  const { updateProjectElement, deleteProjectElement } = useProjectElement();
  const { afterDeleteProjectElement } = useProjectElementListStore();
  const { uploadPEImage } = useImage();

  if (!project) return null;

  const contentRouter = () => {
    switch (data.projectElementType) {
      case ProjectElementType.WORK:
        return <Work peId={data.id} alignment={data.displayAlignment} displaySize={data.displaySize} data={data.work} />;
      case ProjectElementType.DETAIL:
        return <Detail peId={data.id} alignment={data.displayAlignment} displaySize={data.displaySize} data={data.workDetail} />;
      case ProjectElementType.TEXTBOX:
        return <TextBox peId={data.id} alignment={data.textAlignment} data={data.textBox} />;
      case ProjectElementType.DOCUMENT:
        return <Document peId={data.id} alignment={data.displayAlignment} data={data.document} />;
      case ProjectElementType.DIVIDER:
        return <Divider dividerType={data.dividerType} />;
      default:
        return null;
    }
  }

  //이걸 개별 hook으로 빼지 않는 이유:
  // S3에 이미지 업로드 시 필요한 개별적인 정보들이 너무 많다.
  const handleUpdate = async () => {
    let updateDto: UpdateProjectElementReq = convertPeToUpdateReq(data);
    if (data.imageChanged) {
      switch (updateDto.projectElementType) {
        case ProjectElementType.WORK:
          const afterUploadImage = await uploadPEImage(
            aui,
            ServiceType.WORK,
            updateDto.updateWorkReq
          );
          updateDto.updateWorkReq = afterUploadImage as UpdateWorkReq;
          break;

        case ProjectElementType.DETAIL:
          const afterUploadDetailImage = await uploadPEImage(
            aui,
            ServiceType.DETAIL,
            updateDto.updateWorkDetailReq
          );
          updateDto.updateWorkDetailReq = afterUploadDetailImage as UpdateWorkDetailReq;
          break;

        case ProjectElementType.DOCUMENT:
          const afterUploadDocImage = await uploadPEImage(
            aui,
            ServiceType.DOCUMENT,
            updateDto.updateDocumentReq,
            project.id
          );
          updateDto.updateDocumentReq = afterUploadDocImage as UpdateDocumentReq;
          break;
        default:
          break;
      }
    }

    await updateProjectElement(aui, updateDto);
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