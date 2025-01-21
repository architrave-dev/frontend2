import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useAui } from '../../shared/hooks/useAui';
import { BtnConfirm, BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { ProjectElementType, ServiceType } from '../../shared/enum/EnumRepository';
import { useProjectElementListStore } from '../../shared/store/projectElementStore';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import { convertPeToUpdateReq } from '../../shared/converter/converter';
import { ErrorCode } from '../../shared/api/errorCode';
import { base64ToFileWithMime, uploadToS3 } from '../../shared/aws/s3Upload';
import { UpdateProjectElementReq, UpdateUploadFileReq } from '../../shared/dto/ReqDtoRepository';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { ProjectElementData } from '../../shared/dto/EntityRepository';
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
  const { project } = useProjectDetail();
  const { updateProjectElement, deleteProjectElement } = useProjectElement();
  const { afterDeleteProjectElement } = useProjectElementListStore();

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

  const uploadFileWithLocalUrlUpdates = async <T extends { id: string, updateUploadFileReq: UpdateUploadFileReq, workId?: string }>(
    serviceType: ServiceType,
    prevData: T,
  ): Promise<T> => {
    const localImageUrl = prevData.updateUploadFileReq.originUrl;
    const file = base64ToFileWithMime(localImageUrl);
    try {
      let originUrl, thumbnailUrl: string;
      switch (serviceType) {
        case ServiceType.WORK:
          ({ originUrl, thumbnailUrl } = await uploadToS3(file, aui, serviceType, [prevData.id]));
          break;
        case ServiceType.DETAIL:
          ({ originUrl, thumbnailUrl } = await uploadToS3(file, aui, serviceType, [prevData.workId!, prevData.id]));
          break;
        case ServiceType.DOCUMENT:
          ({ originUrl, thumbnailUrl } = await uploadToS3(file, aui, serviceType, [project.id, prevData.id]));
          break;
        default:
          throw new Error('Unsupported service type');
      }
      return {
        ...prevData,
        updateUploadFileReq: {
          ...prevData.updateUploadFileReq,
          originUrl,
          thumbnailUrl
        }
      };
    } catch (error) {
      throw new Error(ErrorCode.AWS);
    }
  };

  //이걸 개별 hook으로 빼지 않는 이유:
  // S3에 이미지 업로드 시 필요한 개별적인 정보들이 너무 많다.
  const handleUpdate = async () => {
    let updateDto: UpdateProjectElementReq = convertPeToUpdateReq(data);
    if (data.imageChanged) {
      switch (updateDto.projectElementType) {
        case ProjectElementType.WORK:
          updateDto.updateWorkReq = await uploadFileWithLocalUrlUpdates(
            ServiceType.WORK,
            updateDto.updateWorkReq
          );
          break;

        case ProjectElementType.DETAIL:
          updateDto.updateWorkDetailReq = await uploadFileWithLocalUrlUpdates(
            ServiceType.DETAIL,
            updateDto.updateWorkDetailReq,
          );
          break;

        case ProjectElementType.DOCUMENT:
          updateDto.updateDocumentReq = await uploadFileWithLocalUrlUpdates(
            ServiceType.DOCUMENT,
            updateDto.updateDocumentReq,
          );
          break;
        default:
          break;
      }
    }

    try {
      await updateProjectElement(aui, updateDto);
    } catch (err) {
    }
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