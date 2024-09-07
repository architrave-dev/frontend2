import React from 'react';
import styled from 'styled-components';
import { CreateProjectElementReq, CreateWorkReq, SizeData, convertSizeToString, convertStringToSize, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import ReplaceImageButton from '../../shared/component/ReplaceImageButton';
import defaultImg from '../../asset/project/default_1.png';
import { WorkAlignment } from '../../shared/component/SelectBox';
import ReuseTextArea, { TextArea } from '../../shared/component/ReuseTextArea';
import { InputWork, InputWorkTitle } from '../../shared/component/headless/input/InputBody';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';

export interface WorkProps {
  tempId: string;
  alignment: WorkAlignment | null;
  data: CreateWorkReq;
}

const WorkTemp: React.FC<WorkProps> = ({ tempId, alignment: initialWorkAlignment, data: initialData }) => {
  const { createdProjectElements, setCreatedProjectElements } = useProjectElementListStoreForUpdate();

  const handlechange = (field: keyof CreateWorkReq, value: string | SizeData) => {
    const newCreatedProjectElements: CreateProjectElementReq[] = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, createWorkReq: { ...each.createWorkReq, [field]: value } as CreateWorkReq } : each
    )
    setCreatedProjectElements(newCreatedProjectElements);
  }

  return (
    <WorkWrapper>
      <ImgWrapper>
        <WorkImage src={initialData.originUrl === '' ? defaultImg : initialData.originUrl} alt={initialData.title} />
        <ReplaceImageButton setBackgroundImageUrl={(imageUrl: string) => handlechange('originUrl', imageUrl)} />
      </ImgWrapper>
      <TitleInfoWrpper>
        <HeadlessInput
          value={initialData.title}
          handleChange={(e) => handlechange("title", e.target.value)}
          placeholder="Title"
          StyledInput={InputWorkTitle}
        />
        <ReuseTextArea
          type={TextArea.WORK}
          alignment={initialWorkAlignment || WorkAlignment.CENTER}
          content={initialData.description}
          handleChange={(e) => handlechange("description", e.target.value)}
          placeholder={"Description"}
        />
        <WorkInfo>
          <HeadlessInput
            value={initialData.material}
            placeholder={"Material"}
            handleChange={(e) => handlechange("material", e.target.value)}
            StyledInput={InputWork}
          />
          <HeadlessInput
            value={convertSizeToString(initialData.size)}
            placeholder={"Size"}
            handleChange={(e) => handlechange("size", convertStringToSize(e.target.value))}
            StyledInput={InputWork}
          />
          <HeadlessInput
            value={initialData.prodYear}
            placeholder={"Year"}
            handleChange={(e) => handlechange("prodYear", e.target.value)}
            StyledInput={InputWork}
          />
        </WorkInfo>
      </TitleInfoWrpper>
    </WorkWrapper>
  );
};

const WorkWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: ${({ theme }) => theme.colors.color_Gray_06};
`;
const ImgWrapper = styled.div`
  position: relative;
`

const WorkImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  margin-bottom: 16px;
  object-fit: contain;
`;

const TitleInfoWrpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const WorkInfo = styled.div`
  display: flex;
  gap: 4px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 19px;
  padding: 4px 8px;
  margin-bottom: 2px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  line-height: ${({ theme }) => theme.fontSize.font_B03};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  outline: none;
  text-align: center;
  ${({ theme }) => theme.typography.Body_02_2};
`;


export default WorkTemp;
