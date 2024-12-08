import React from 'react';
import { useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import { InputWork, InputWorkTitle } from '../../shared/component/headless/input/InputBody';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaWork } from '../../shared/component/headless/textarea/TextAreaBody';
import { SelectType, DisplayAlignment, WorkDisplaySize, TextAlignment } from '../../shared/enum/EnumRepository';
import { CreateProjectElementReq, CreateWorkReq } from '../../shared/dto/ReqDtoRepository';
import { SizeData, convertSizeToString, convertStringToSize } from '../../shared/dto/EntityRepository';
import SelectBox from '../../shared/component/SelectBox';
import { ImgWrapper, SelectBoxContainer, SelectBoxWrapper, TitleInfoWrpper, WorkImage, WorkInfo, WorkWrapper } from './Work';
import MoleculeImg from '../../shared/component/molecule/MoleculeImg';
import { useValidation } from '../../shared/hooks/useValidation';

export interface WorkProps {
  tempId: string;
  alignment: DisplayAlignment | null;
  displaySize: WorkDisplaySize | null;
  data: CreateWorkReq;
}

const WorkTemp: React.FC<WorkProps> = ({ tempId, alignment: initialWorkAlignment, displaySize: initialDisplaySize, data: initialData }) => {
  const { createdProjectElements, setCreatedProjectElements } = useProjectElementListStoreForUpdate();
  const { checkType } = useValidation();

  const handleChange = (field: keyof CreateWorkReq, value: string | SizeData) => {
    if (!checkType(field, value)) {
      return;
    };
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

  const handleSubChange = (
    key: 'workDisplaySize' | 'workAlignment',
    value: WorkDisplaySize | DisplayAlignment
  ) => {
    const updatedProjectElementList = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, [key]: value } : each
    );
    setCreatedProjectElements(updatedProjectElementList);
  };

  return (
    <WorkWrapper>
      <SelectBoxContainer>
        <SelectBoxWrapper>
          <SelectBox
            value={initialDisplaySize || WorkDisplaySize.BIG}
            selectType={SelectType.WORK_SIZE}
            handleChange={value => handleSubChange('workDisplaySize', value)}
            direction={false} />
        </SelectBoxWrapper>
        <SelectBoxWrapper>
          <SelectBox
            value={initialWorkAlignment || DisplayAlignment.CENTER}
            selectType={SelectType.DISPLAY_ALIGNMENT}
            handleChange={value => handleSubChange('workAlignment', value)}
            direction={false} />
        </SelectBoxWrapper>
      </SelectBoxContainer>
      <ImgWrapper>
        <MoleculeImg
          srcUrl={initialData.originUrl}
          alt={initialData.title}
          displaySize={initialDisplaySize}
          handleChange={(thumbnailUrl: string, originUrl: string) => setOriginThumbnailUrl(thumbnailUrl, originUrl)}
          StyledImg={WorkImage}
        />
      </ImgWrapper>
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
    </WorkWrapper>
  );
};

export default WorkTemp;