import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { InputWork, InputWorkTitle } from '../../shared/component/headless/input/InputBody';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaWork } from '../../shared/component/headless/textarea/TextAreaBody';
import { SelectType, DisplayAlignment, WorkDisplaySize, TextAlignment } from '../../shared/enum/EnumRepository';
import { ProjectElementData, SizeData, WorkData, convertSizeToString, convertStringToSize } from '../../shared/dto/EntityRepository';
import { UpdateProjectElementReq, UpdateWorkReq } from '../../shared/dto/ReqDtoRepository';
import SelectBox from '../../shared/component/SelectBox';
import MoleculeImg from '../../shared/component/molecule/MoleculeImg';
import MoleculeShowOriginBtn from '../../shared/component/molecule/MoleculeShowOriginBtn';
import { OriginBtnBottom } from '../../shared/component/headless/button/BtnBody';
import { useValidation } from '../../shared/hooks/useValidation';

export interface WorkProps {
  alignment: DisplayAlignment | null;
  displaySize: WorkDisplaySize | null;
  data: WorkData;
}

const Work: React.FC<WorkProps> = ({ alignment: initialWorkAlignment, displaySize: initialDisplaySize, data: initialData }) => {
  const { isEditMode } = useEditMode();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { updatedProjectElements, setUpdatedProjectElements } = useProjectElementListStoreForUpdate();
  const { checkType } = useValidation();

  const handleChange = (field: keyof WorkData, value: string | SizeData) => {
    if (!checkType(field, value)) {
      return;
    };
    const targetElement = updatedProjectElements.find(pe => pe.updateWorkReq?.id === initialData.id);
    if (targetElement) {
      //updatedProjectElements에 있다면
      const updatedProjectElementList = updatedProjectElements.map(each =>
        each.updateWorkReq?.id === initialData.id ? { ...each, updateWorkReq: { ...each.updateWorkReq, [field]: value } as UpdateWorkReq } : each
      )
      setUpdatedProjectElements(updatedProjectElementList);
    } else {
      //updatedProjectElements에 없다면
      const target = projectElementList.find(pe => pe.work?.id === initialData.id);

      if (!target) return;
      const targetWork = target.work;
      if (!targetWork) return;
      //target으로 UpdateProjectElementReq 를 생성 후 
      const convetedToProjectElementReq: UpdateProjectElementReq = {
        projectElementId: target.id,
        updateWorkReq: {
          id: targetWork.id,
          workType: targetWork.workType,
          originUrl: targetWork.originUrl,
          thumbnailUrl: targetWork.thumbnailUrl,
          title: targetWork.title,
          description: targetWork.description,
          size: targetWork.size,
          material: targetWork.material,
          prodYear: targetWork.prodYear,
          price: targetWork.price,
          collection: targetWork.collection
        },
        workAlignment: target.workAlignment,
        workDisplaySize: target.workDisplaySize,
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
        updateWorkReq: {
          ...convetedToProjectElementReq.updateWorkReq,
          [field]: value
        } as UpdateWorkReq
      };
      setUpdatedProjectElements([...updatedProjectElements, newUpdateProjectElementReq]);
    }
    const updatedProjectElementList: ProjectElementData[] = projectElementList.map(each =>
      each.work?.id === initialData.id ? { ...each, work: { ...each.work, [field]: value } as WorkData } : each
    )
    setProjectElementList(updatedProjectElementList);
  }

  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    const targetElement = updatedProjectElements.find(pe => pe.updateWorkReq?.id === initialData.id);
    if (targetElement) {
      //updatedProjectElements에 있다면
      const updatedProjectElementList = updatedProjectElements.map(each =>
        each.updateWorkReq?.id === initialData.id ? { ...each, updateWorkReq: { ...each.updateWorkReq, thumbnailUrl, originUrl } as UpdateWorkReq } : each
      )
      setUpdatedProjectElements(updatedProjectElementList);
    } else {
      //updatedProjectElements에 없다면
      const target = projectElementList.find(pe => pe.work?.id === initialData.id);

      if (!target) return;
      const targetWork = target.work;
      if (!targetWork) return;
      //target으로 UpdateProjectElementReq 를 생성 후??
      const convetedToProjectElementReq: UpdateProjectElementReq = {
        projectElementId: target.id,
        updateWorkReq: {
          id: targetWork.id,
          workType: targetWork.workType,
          originUrl: targetWork.originUrl,
          thumbnailUrl: targetWork.thumbnailUrl,
          title: targetWork.title,
          description: targetWork.description,
          size: targetWork.size,
          material: targetWork.material,
          prodYear: targetWork.prodYear,
          price: targetWork.price,
          collection: targetWork.collection
        },
        workAlignment: target.workAlignment,
        workDisplaySize: target.workDisplaySize,
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
        updateWorkReq: {
          ...convetedToProjectElementReq.updateWorkReq,
          thumbnailUrl,
          originUrl
        } as UpdateWorkReq
      };
      setUpdatedProjectElements([...updatedProjectElements, newUpdateProjectElementReq]);
    }
    const updatedProjectElementList: ProjectElementData[] = projectElementList.map(each =>
      each.work?.id === initialData.id ? { ...each, work: { ...each.work, thumbnailUrl, originUrl } as WorkData } : each
    )
    setProjectElementList(updatedProjectElementList);
  }

  const handleSizeChange = (value: WorkDisplaySize) => {
    const targetElement = updatedProjectElements.find(pe => pe.updateWorkReq?.id === initialData.id);
    if (targetElement) {
      const updatedProjectElementList = updatedProjectElements.map(each =>
        each.updateWorkReq?.id === initialData.id ? { ...each, workDisplaySize: value } : each
      )
      setUpdatedProjectElements(updatedProjectElementList);
    } else {
      const target = projectElementList.find(pe => pe.work?.id === initialData.id);
      if (!target) return;
      const newUpdateProjectElementReq: UpdateProjectElementReq = {
        projectElementId: target.id,
        updateWorkReq: initialData,
        workAlignment: null,
        workDisplaySize: value,
        updateTextBoxReq: null,
        textBoxAlignment: null,
        updateDocumentReq: null,
        documentAlignment: null,
        dividerType: null
      }
      setUpdatedProjectElements([...updatedProjectElements, newUpdateProjectElementReq]);
    }
    const updatedProjectElementList = projectElementList.map(each =>
      each.work?.id === initialData.id ? { ...each, workDisplaySize: value } : each
    );
    setProjectElementList(updatedProjectElementList);
  };

  return (
    <WorkWrapper>
      {isEditMode &&
        <SelectBoxContainer>
          <SelectBox
            value={initialDisplaySize || WorkDisplaySize.BIG}
            selectType={SelectType.WORK_SIZE}
            handleChange={handleSizeChange}
            direction={false} />
        </SelectBoxContainer>
      }
      <ImgWrapper>
        <MoleculeShowOriginBtn originUrl={initialData.originUrl} styledBtn={OriginBtnBottom} />
        <MoleculeImg
          srcUrl={initialData.originUrl}
          alt={initialData.title}
          displaySize={initialDisplaySize}
          handleChange={(thumbnailUrl: string, originUrl: string) => setOriginThumbnailUrl(thumbnailUrl, originUrl)}
          StyledImg={WorkImage}
        />
      </ImgWrapper>
      {isEditMode ? (
        <>
          <TitleInfoWrpper>
            <HeadlessInput
              value={initialData.title}
              handleChange={(e) => handleChange("title", e.target.value)}
              placeholder="Title"
              StyledInput={InputWorkTitle}
            />
            <HeadlessTextArea
              alignment={TextAlignment.CENTER}
              content={initialData.description}
              placeholder={"Description"}
              handleChange={(e) => handleChange("description", e.target.value)}
              StyledTextArea={TextAreaWork}
            />
            <WorkInfo>
              <HeadlessInput
                value={initialData.material}
                placeholder={"Material"}
                handleChange={(e) => handleChange("material", e.target.value)}
                StyledInput={InputWork}
              />
              <HeadlessInput
                value={convertSizeToString(initialData.size)}
                placeholder={"Size"}
                handleChange={(e) => handleChange("size", convertStringToSize(e.target.value))}
                StyledInput={InputWork}
              />
              <HeadlessInput
                value={initialData.prodYear}
                placeholder={"Year"}
                handleChange={(e) => handleChange("prodYear", e.target.value)}
                StyledInput={InputWork}
              />
            </WorkInfo>
          </TitleInfoWrpper>
        </>
      ) : (
        <>
          <TitleInfoWrpper>
            <Title>[ {initialData.title} ]</Title>
            <Description>
              {initialData.description.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}<br />
                </React.Fragment>
              ))}
            </Description>
            <WorkInfo>
              <Info>{initialData.material},</Info>
              <Info>{convertSizeToString(initialData.size)},</Info>
              <Info>{initialData.prodYear}</Info>
            </WorkInfo>
          </TitleInfoWrpper>
        </>
      )}
    </WorkWrapper>
  );
};

export const WorkWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: ${({ theme }) => theme.colors.color_Gray_06};
`;

export const SelectBoxContainer = styled.div`
  position: absolute;
  top: -30px;
  width: 100%;
  display: flex;
  gap: 20px;
`
export const ImgWrapper = styled.div`
  position: relative;

  margin-bottom: 16px;
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

export const TitleInfoWrpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const WorkInfo = styled.div`
  display: flex;
  gap: 4px;
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
