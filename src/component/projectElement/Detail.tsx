import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import { InputWorkTitle } from '../../shared/component/headless/input/InputBody';
import { SelectType, DisplayAlignment, WorkDisplaySize } from '../../shared/enum/EnumRepository';
import { ProjectElementData, WorkDetailData } from '../../shared/dto/EntityRepository';
import { UpdateProjectElementReq, UpdateWorkDetailReq } from '../../shared/dto/ReqDtoRepository';
import SelectBox from '../../shared/component/SelectBox';
import MoleculeImg from '../../shared/component/molecule/MoleculeImg';
import MoleculeShowOriginBtn from '../../shared/component/molecule/MoleculeShowOriginBtn';
import { OriginBtnBottom } from '../../shared/component/headless/button/BtnBody';
import { useValidation } from '../../shared/hooks/useValidation';
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';


export interface DetailProps {
  alignment: DisplayAlignment | null;
  displaySize: WorkDisplaySize | null;
  data: WorkDetailData;
}

const Work: React.FC<DetailProps> = ({ alignment: initialDetailAlignment, displaySize: initialDetailDisplaySize, data: initialData }) => {
  const { isEditMode } = useEditMode();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { updatedProjectElements, setUpdatedProjectElements } = useProjectElementListStoreForUpdate();
  const { checkType } = useValidation();

  const handleChange = (field: keyof WorkDetailData, value: string) => {
    if (field == 'workId') return null;
    if (!checkType(field, value)) {
      return;
    };
    const targetElement = updatedProjectElements.find(pe => pe.updateWorkDetailReq?.id === initialData.id);
    if (targetElement) {
      //updatedProjectElements에 있다면
      const updatedProjectElementList = updatedProjectElements.map(each =>
        each.updateWorkDetailReq?.id === initialData.id ? { ...each, updateWorkDetailReq: { ...each.updateWorkDetailReq, [field]: value } as UpdateWorkDetailReq } : each
      )
      setUpdatedProjectElements(updatedProjectElementList);
    } else {
      //updatedProjectElements에 없다면
      const target = projectElementList.find(pe => pe.workDetail?.id === initialData.id);

      if (!target) return;
      const targetDetail = target.workDetail;
      if (!targetDetail) return;
      //target으로 UpdateProjectElementReq 를 생성 후 
      const convetedToProjectElementReq: UpdateProjectElementReq = {
        projectElementId: target.id,
        updateWorkReq: null,
        workAlignment: null,
        workDisplaySize: null,
        updateWorkDetailReq: {
          ...targetDetail,
          updateUploadFileReq: {
            uploadFileId: targetDetail.uploadFile.id,
            ...targetDetail.uploadFile
          },
        },
        workDetailAlignment: target.workDetailAlignment,
        workDetailDisplaySize: target.workDetailDisplaySize,
        updateTextBoxReq: null,
        textBoxAlignment: null,
        updateDocumentReq: null,
        documentAlignment: null,
        dividerType: null
      }
      //projectElementList에서 id로 찾고
      //updatedProjectElements에 추가한다.
      const newUpdateProjectElementReq: UpdateProjectElementReq = {
        ...convetedToProjectElementReq,
        updateWorkDetailReq: {
          ...convetedToProjectElementReq.updateWorkDetailReq,
          [field]: value
        } as UpdateWorkDetailReq
      };
      setUpdatedProjectElements([...updatedProjectElements, newUpdateProjectElementReq]);
    }
    const updatedProjectElementList: ProjectElementData[] = projectElementList.map(each =>
      each.workDetail?.id === initialData.id ? { ...each, workDetail: { ...each.workDetail, [field]: value } as WorkDetailData } : each
    )
    setProjectElementList(updatedProjectElementList);
  }

  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    const targetElement = updatedProjectElements.find(pe => pe.updateWorkDetailReq?.id === initialData.id);
    if (targetElement) {
      //updatedProjectElements에 있다면
      const updatedProjectElementList = updatedProjectElements.map(each =>
        each.updateWorkDetailReq?.id === initialData.id ? { ...each, updateWorkDetailReq: { ...each.updateWorkDetailReq, thumbnailUrl, originUrl } as UpdateWorkDetailReq } : each
      )
      setUpdatedProjectElements(updatedProjectElementList);
    } else {
      //updatedProjectElements에 없다면
      const target = projectElementList.find(pe => pe.workDetail?.id === initialData.id);

      if (!target) return;
      const targetDetail = target.workDetail;
      if (!targetDetail) return;
      //target으로 UpdateProjectElementReq 를 생성 후??
      const convetedToProjectElementReq: UpdateProjectElementReq = {
        projectElementId: target.id,
        updateWorkReq: null,
        workAlignment: null,
        workDisplaySize: null,
        updateWorkDetailReq: {
          ...targetDetail,
          updateUploadFileReq: {
            uploadFileId: targetDetail.uploadFile.id,
            originUrl: originUrl,
            thumbnailUrl: thumbnailUrl,
          },
        },
        workDetailAlignment: target.workDetailAlignment,
        workDetailDisplaySize: target.workDetailDisplaySize,
        updateTextBoxReq: null,
        textBoxAlignment: null,
        updateDocumentReq: null,
        documentAlignment: null,
        dividerType: null
      }
      setUpdatedProjectElements([...updatedProjectElements, convetedToProjectElementReq]);
    }
    const updatedProjectElementList: ProjectElementData[] = projectElementList.map(each =>
      each.workDetail?.id === initialData.id ? {
        ...each,
        workDetail: {
          ...each.workDetail,
          uploadFile: {
            ...each.workDetail.uploadFile,
            originUrl,
            thumbnailUrl
          }
        } as WorkDetailData
      } : each
    )
    setProjectElementList(updatedProjectElementList);
  }

  const handleSubChange = (
    key: 'workDetailDisplaySize' | 'workDetailAlignment',
    value: WorkDisplaySize | DisplayAlignment
  ) => {
    const targetElement = updatedProjectElements.find(pe => pe.updateWorkDetailReq?.id === initialData.id);
    if (targetElement) {
      const updatedProjectElementList = updatedProjectElements.map(each =>
        each.updateWorkDetailReq?.id === initialData.id ? { ...each, [key]: value } : each
      )
      setUpdatedProjectElements(updatedProjectElementList);
    } else {
      const target = projectElementList.find(pe => pe.workDetail?.id === initialData.id);
      if (!target || !target.workDetail) return;
      const newUpdateProjectElementReq: UpdateProjectElementReq = {
        projectElementId: target.id,
        updateWorkReq: null,
        workAlignment: null,
        workDisplaySize: null,
        updateWorkDetailReq: {
          ...target.workDetail,
          updateUploadFileReq: {
            uploadFileId: target.workDetail.uploadFile.id,
            ...target.workDetail.uploadFile
          },
        },
        workDetailAlignment: key === 'workDetailAlignment' ? (value as DisplayAlignment) : target.workDetailAlignment,
        workDetailDisplaySize: key === 'workDetailDisplaySize' ? (value as WorkDisplaySize) : target.workDetailDisplaySize,
        updateTextBoxReq: null,
        textBoxAlignment: null,
        updateDocumentReq: null,
        documentAlignment: null,
        dividerType: null
      }
      setUpdatedProjectElements([...updatedProjectElements, newUpdateProjectElementReq]);
    }
    const updatedProjectElementList = projectElementList.map(each =>
      each.workDetail?.id === initialData.id ? { ...each, [key]: value } : each
    );
    setProjectElementList(updatedProjectElementList);
  };

  return (
    <WorkWrapper>
      {isEditMode &&
        <SelectBoxContainer>
          <SelectBoxWrapper>
            <SelectBox
              value={initialDetailDisplaySize || WorkDisplaySize.BIG}
              selectType={SelectType.WORK_SIZE}
              handleChange={value => handleSubChange('workDetailDisplaySize', value)}
              direction={false} />
          </SelectBoxWrapper>
          <SelectBoxWrapper>
            <SelectBox
              value={initialDetailAlignment || DisplayAlignment.CENTER}
              selectType={SelectType.DISPLAY_ALIGNMENT}
              handleChange={value => handleSubChange('workDetailAlignment', value)}
              direction={false} />
          </SelectBoxWrapper>
        </SelectBoxContainer>
      }
      <WorkCoreWrapper $workAlignment={initialDetailAlignment || DisplayAlignment.CENTER}>
        <ImgWrapper $workAlignment={initialDetailAlignment || DisplayAlignment.CENTER}>
          <MoleculeShowOriginBtn originUrl={convertS3UrlToCloudFrontUrl(initialData.uploadFile.originUrl)} styledBtn={OriginBtnBottom} />
          <MoleculeImg
            srcUrl={convertS3UrlToCloudFrontUrl(initialData.uploadFile.originUrl)}
            alt={initialData.description}
            displaySize={initialDetailDisplaySize}
            handleChange={(thumbnailUrl: string, originUrl: string) => setOriginThumbnailUrl(thumbnailUrl, originUrl)}
            StyledImg={WorkImage}
          />
        </ImgWrapper>
        <TitleInfoWrpper $workAlignment={initialDetailAlignment || DisplayAlignment.CENTER}>
          <MoleculeInputDiv
            value={initialData.description}
            placeholder={"description"}
            handleChange={(e) => handleChange('description', e.target.value)}
            inputStyle={InputWorkTitle}
            StyledDiv={Title}
          />
        </TitleInfoWrpper>
      </WorkCoreWrapper>
    </WorkWrapper>
  );
};

export const WorkWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SelectBoxContainer = styled.div`
  position: absolute;
  top: -30px;
  width: 100%;
  display: flex;
  gap: 20px;
`

export const WorkImage = styled.img<{ $displaySize: WorkDisplaySize }>`
  max-width: 100%;
  max-height: ${({ $displaySize }) => {
    switch ($displaySize) {
      case WorkDisplaySize.SMALL:
        return '35vh';
      case WorkDisplaySize.REGULAR:
        return '55vh';
      case WorkDisplaySize.BIG:
      default:
        return '90vh';
    }
  }};
  object-fit: contain;
`;

export const WorkCoreWrapper = styled.div<{ $workAlignment: DisplayAlignment }>`
  display: flex;
  flex-direction: ${({ $workAlignment }) => {
    switch ($workAlignment) {
      case DisplayAlignment.CENTER:
        return 'column';
      case DisplayAlignment.RIGHT:
        return 'row-reverse';
      case DisplayAlignment.LEFT:
      default:
        return 'row';
    }
  }};
  gap: ${({ $workAlignment }) => {
    switch ($workAlignment) {
      case DisplayAlignment.CENTER:
        return '10px';
      default:
        return '0px';
    }
  }};
`;

export const ImgWrapper = styled.div<{ $workAlignment: DisplayAlignment }>`
  position: relative;
  width: ${({ $workAlignment }) => {
    switch ($workAlignment) {
      case DisplayAlignment.CENTER:
        return '100%';
      default:
        return '80%';
    }
  }};
`

export const TitleInfoWrpper = styled.div<{ $workAlignment: DisplayAlignment }>`
  width: ${({ $workAlignment }) => {
    switch ($workAlignment) {
      case DisplayAlignment.CENTER:
        return '100%';
      default:
        return '20%';
    }
  }};

  display: flex;
  flex-direction: column;
  justify-content: ${({ $workAlignment }) => {
    switch ($workAlignment) {
      case DisplayAlignment.CENTER:
        return 'flex-start';
      default:
        return 'flex-end';
    }
  }};
  align-items: center;
`

export const SelectBoxWrapper = styled.article`
  width: 8vw;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_04};
`;

const Title = styled.h2`
  width: 100%;
  height: 18px;
  padding: 0px 8px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  text-align: center;
  ${({ theme }) => theme.typography.Body_02_2};
`;

export default Work;
