import React from 'react';
import styled from 'styled-components';
import { useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import ReplaceImageButton from '../../shared/component/ReplaceImageButton';
import { InputWork, InputWorkTitle } from '../../shared/component/headless/input/InputBody';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaWork } from '../../shared/component/headless/textarea/TextAreaBody';
import defaultImg from '../../asset/project/default_1.png';
import { WorkAlignment } from '../../shared/enum/EnumRepository';
import { CreateProjectElementReq, CreateWorkReq } from '../../shared/dto/ReqDtoRepository';
import { SizeData, convertSizeToString, convertStringToSize } from '../../shared/dto/EntityRepository';

export interface WorkProps {
  tempId: string;
  alignment: WorkAlignment | null;
  data: CreateWorkReq;
}

const WorkTemp: React.FC<WorkProps> = ({ tempId, alignment: initialWorkAlignment, data: initialData }) => {
  const { createdProjectElements, setCreatedProjectElements } = useProjectElementListStoreForUpdate();

  const handleChange = (field: keyof CreateWorkReq, value: string | SizeData) => {
    const newCreatedProjectElements: CreateProjectElementReq[] = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, createWorkReq: { ...each.createWorkReq, [field]: value } as CreateWorkReq } : each
    )
    setCreatedProjectElements(newCreatedProjectElements);
  }

  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    handleChange('thumbnailUrl', thumbnailUrl);
    handleChange('originUrl', originUrl);
  }
  return (
    <WorkWrapper>
      <ImgWrapper>
        <WorkImage src={initialData.originUrl === '' ? defaultImg : initialData.originUrl} alt={initialData.title} />
        <ReplaceImageButton setImageUrl={(thumbnailUrl: string, originUrl: string) => setOriginThumbnailUrl(thumbnailUrl, originUrl)} />
      </ImgWrapper>
      <TitleInfoWrpper>
        <HeadlessInput
          value={initialData.title}
          handleChange={(e) => handleChange("title", e.target.value)}
          placeholder="Title"
          StyledInput={InputWorkTitle}
        />
        <HeadlessTextArea
          alignment={initialWorkAlignment || WorkAlignment.CENTER}
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


export default WorkTemp;
