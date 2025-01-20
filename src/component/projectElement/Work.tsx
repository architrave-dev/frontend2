import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectElementListStore } from '../../shared/store/projectElementStore';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { InputWork, InputWorkTitle } from '../../shared/component/headless/input/InputBody';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaWork } from '../../shared/component/headless/textarea/TextAreaBody';
import { SelectType, DisplayAlignment, DisplaySize, TextAlignment, ProjectElementType } from '../../shared/enum/EnumRepository';
import { SizeData, WorkData, convertSizeToString, convertStringToSize } from '../../shared/dto/EntityRepository';
import SelectBox from '../../shared/component/SelectBox';
import MoleculeImg from '../../shared/component/molecule/MoleculeImg';
import MoleculeShowOriginBtn from '../../shared/component/molecule/MoleculeShowOriginBtn';
import { OriginBtnBottom } from '../../shared/component/headless/button/BtnBody';
import { useValidation } from '../../shared/hooks/useValidation';
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';

export interface WorkProps {
  peId: string;
  alignment: DisplayAlignment;
  displaySize: DisplaySize;
  data: WorkData;
}

const Work: React.FC<WorkProps> = ({ peId, alignment, displaySize, data }) => {
  const { isEditMode } = useEditMode();
  const {
    updateWork: handleChange,
    updateImage: handleImageChange,
    updateDisplayAlignment: handleDisplayAlignmentChange,
    updateDisplaySize: handleDisplaySizeChange
  } = useProjectElementListStore();
  const { checkType } = useValidation();

  const handleChangeWithValidate = (field: keyof WorkData, value: string | SizeData) => {
    if (!checkType(field, value)) {
      return;
    };
    handleChange(peId, { [field]: value });
  }

  // const handleChange = (field: keyof WorkData, value: string | SizeData) => {
  // if (!checkType(field, value)) {
  //   return;
  // };
  // const targetElement = updatedProjectElements.find(pe => pe.updateWorkReq?.id === data.id);
  // if (targetElement) {
  //   //updatedProjectElements에 있다면
  //   const updatedProjectElementList = updatedProjectElements.map(each =>
  //     each.updateWorkReq?.id === data.id ? { ...each, updateWorkReq: { ...each.updateWorkReq, [field]: value } as UpdateWorkReq } : each
  //   )
  //   setUpdatedProjectElements(updatedProjectElementList);
  // } else {
  //   //updatedProjectElements에 없다면
  //   const target = projectElementList.find(pe => pe.work?.id === data.id);

  //   if (!target) return;
  //   const targetWork = target.work;
  //   if (!targetWork) return;
  //   //target으로 UpdateProjectElementReq 를 생성 후 
  //   const convetedToProjectElementReq: UpdateProjectElementReq = {
  //     projectElementId: target.id,
  //     updateWorkReq: {
  //       id: targetWork.id,
  //       workType: targetWork.workType,
  //       updateUploadFileReq: {
  //         uploadFileId: targetWork.uploadFile.id,
  //         originUrl: targetWork.uploadFile.originUrl,
  //         thumbnailUrl: targetWork.uploadFile.thumbnailUrl,
  //       },
  //       title: targetWork.title,
  //       description: targetWork.description,
  //       size: targetWork.size,
  //       material: targetWork.material,
  //       prodYear: targetWork.prodYear,
  //       price: targetWork.price,
  //       collection: targetWork.collection
  //     },
  //     workAlignment: target.workAlignment,
  //     DisplaySize: target.DisplaySize,
  //     updateWorkDetailReq: null,
  //     workDetailAlignment: null,
  //     workDetailDisplaySize: null,
  //     updateTextBoxReq: null,
  //     textBoxAlignment: null,
  //     updateDocumentReq: null,
  //     documentAlignment: null,
  //     dividerType: null
  //   }
  //   //projectElementList에서 id로 찾고
  //   //updatedProjectElements에 추가한다.
  //   const newUpdateProjectElementReq: UpdateProjectElementReq = {
  //     ...convetedToProjectElementReq,
  //     updateWorkReq: {
  //       ...convetedToProjectElementReq.updateWorkReq,
  //       [field]: value
  //     } as UpdateWorkReq
  //   };
  //   setUpdatedProjectElements([...updatedProjectElements, newUpdateProjectElementReq]);
  // }
  // const updatedProjectElementList: ProjectElementData[] = projectElementList.map(each =>
  //   each.work?.id === data.id ? { ...each, work: { ...each.work, [field]: value } as WorkData } : each
  // )
  // setProjectElementList(updatedProjectElementList);
  // }

  return (
    <WorkWrapper>
      {isEditMode &&
        <SelectBoxContainer>
          <SelectBoxWrapper>
            <SelectBox
              value={displaySize || DisplaySize.BIG}
              selectType={SelectType.WORK_SIZE}
              handleChange={(value) => handleDisplaySizeChange(peId, value)}
              direction={false} />
          </SelectBoxWrapper>
          <SelectBoxWrapper>
            <SelectBox
              value={alignment || DisplayAlignment.CENTER}
              selectType={SelectType.DISPLAY_ALIGNMENT}
              handleChange={value => handleDisplayAlignmentChange(peId, value)}
              direction={false} />
          </SelectBoxWrapper>
        </SelectBoxContainer>
      }
      <WorkCoreWrapper $workAlignment={alignment || DisplayAlignment.CENTER}>
        <ImgWrapper $workAlignment={alignment || DisplayAlignment.CENTER}>
          <MoleculeShowOriginBtn originUrl={convertS3UrlToCloudFrontUrl(data.uploadFile.originUrl)} styledBtn={OriginBtnBottom} />
          <MoleculeImg
            srcUrl={convertS3UrlToCloudFrontUrl(data.uploadFile.originUrl)}
            alt={data.title}
            displaySize={displaySize}
            handleChange={(thumbnailUrl: string, originUrl: string) => handleImageChange(
              peId,
              thumbnailUrl,
              originUrl
            )}
            StyledImg={WorkImage}
          />
        </ImgWrapper>
        {isEditMode ? (
          <>
            <TitleInfoWrpper $workAlignment={alignment || DisplayAlignment.CENTER}>
              <HeadlessInput
                value={data.title}
                handleChange={(e) => handleChangeWithValidate("title", e.target.value)}
                placeholder="Title"
                StyledInput={InputWorkTitle}
              />
              <HeadlessTextArea
                alignment={TextAlignment.CENTER}
                content={data.description}
                placeholder={"Description"}
                handleChange={(e) => handleChangeWithValidate("description", e.target.value)}
                StyledTextArea={TextAreaWork}
              />
              <WorkInfo>
                <HeadlessInput
                  value={data.material}
                  placeholder={"Material"}
                  handleChange={(e) => handleChangeWithValidate("material", e.target.value)}
                  StyledInput={InputWork}
                />
                <HeadlessInput
                  value={convertSizeToString(data.size)}
                  placeholder={"Size"}
                  handleChange={(e) => handleChangeWithValidate("size", convertStringToSize(e.target.value))}
                  StyledInput={InputWork}
                />
                <HeadlessInput
                  value={data.prodYear}
                  placeholder={"Year"}
                  handleChange={(e) => handleChangeWithValidate("prodYear", e.target.value)}
                  StyledInput={InputWork}
                />
              </WorkInfo>
            </TitleInfoWrpper>
          </>
        ) : (
          <>
            <TitleInfoWrpper $workAlignment={alignment || DisplayAlignment.CENTER}>
              <Title>[ {data.title} ]</Title>
              <Description>
                {data.description.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}<br />
                  </React.Fragment>
                ))}
              </Description>
              <WorkInfo>
                <Info>{data.material},</Info>
                <Info>{convertSizeToString(data.size)},</Info>
                <Info>{data.prodYear}</Info>
              </WorkInfo>
            </TitleInfoWrpper>
          </>
        )}
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


export const WorkImage = styled.img<{ $displaySize: DisplaySize }>`
  max-width: 100%;
  max-height: ${({ $displaySize }) => {
    switch ($displaySize) {
      case DisplaySize.SMALL:
        return '35vh';
      case DisplaySize.REGULAR:
        return '55vh';
      case DisplaySize.BIG:
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
        return '16px';
      default:
        return '10px';
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

export const WorkInfo = styled.div`
  display: flex;
  gap: 4px;
`;

export const SelectBoxWrapper = styled.article`
  width: 8vw;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_04};
`;

const Info = styled.div`
  height: 18px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  text-align: center;
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

const Description = styled.div`
  padding: 8px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  text-align: center;
  margin-bottom: 1px;
  ${({ theme }) => theme.typography.Body_03_2};
`

export default Work;
