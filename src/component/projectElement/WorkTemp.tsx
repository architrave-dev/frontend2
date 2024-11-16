import React from 'react';
import { useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import ReplaceImageButton from '../../shared/component/ReplaceImageButton';
import { InputWork, InputWorkTitle } from '../../shared/component/headless/input/InputBody';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaWork } from '../../shared/component/headless/textarea/TextAreaBody';
import defaultImg from '../../asset/project/default_1.png';
import { SelectType, WorkAlignment, WorkDisplaySize } from '../../shared/enum/EnumRepository';
import { CreateProjectElementReq, CreateWorkReq } from '../../shared/dto/ReqDtoRepository';
import { SizeData, convertSizeToString, convertStringToSize } from '../../shared/dto/EntityRepository';
import SelectBox from '../../shared/component/SelectBox';
import { ImgWrapper, SelectBoxContainer, TitleInfoWrpper, WorkImage, WorkInfo, WorkWrapper } from './Work';

export interface WorkProps {
  tempId: string;
  alignment: WorkAlignment | null;
  displaySize: WorkDisplaySize | null;
  data: CreateWorkReq;
}

const WorkTemp: React.FC<WorkProps> = ({ tempId, alignment: initialWorkAlignment, displaySize: initialDisplaySize, data: initialData }) => {
  const { createdProjectElements, setCreatedProjectElements } = useProjectElementListStoreForUpdate();

  const handleChange = (field: keyof CreateWorkReq, value: string | SizeData) => {
    const newCreatedProjectElements: CreateProjectElementReq[] = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, createWorkReq: { ...each.createWorkReq, [field]: value } as CreateWorkReq } : each
    )
    setCreatedProjectElements(newCreatedProjectElements);
  }

  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    const updatedCreatedProjectElements = createdProjectElements.map((each) =>
      each.tempId === tempId ? {
        ...each,
        createWorkReq: {
          ...each.createWorkReq,
          thumbnailUrl,
          originUrl,
        } as CreateWorkReq
      } : each);
    setCreatedProjectElements(updatedCreatedProjectElements);
  }

  const handleSizeChange = (value: WorkDisplaySize) => {
    const updatedProjectElementList = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, workDisplaySize: value } : each
    );
    setCreatedProjectElements(updatedProjectElementList);
  };
  return (
    <WorkWrapper>
      <SelectBoxContainer>
        <SelectBox
          value={initialDisplaySize || WorkDisplaySize.BIG}
          selectType={SelectType.WORK_SIZE}
          handleChange={handleSizeChange} />
      </SelectBoxContainer>
      <ImgWrapper>
        <WorkImage
          src={initialData.originUrl === '' ? defaultImg : initialData.originUrl}
          alt={initialData.title}
          $displaySize={initialDisplaySize || WorkDisplaySize.BIG}
        />
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

export default WorkTemp;
