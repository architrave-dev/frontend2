import React from 'react';
import { useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import SelectBox from '../../shared/component/SelectBox';
import { SelectBoxContainer, TextBoxWrapper } from './TextBox';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaTextBox } from '../../shared/component/headless/textarea/TextAreaBody';
import { SelectType, WorkAlignment, WorkDisplaySize } from '../../shared/enum/EnumRepository';
import { CreateDocumentReq, CreateProjectElementReq } from '../../shared/dto/ReqDtoRepository';
import { DocumentWrapper } from './Document';
import { ImgWrapper, WorkImage } from './Work';
import ReplaceImageButton from '../../shared/component/ReplaceImageButton';
import defaultImg from '../../asset/project/default_1.png';


export interface DocumentProps {
  tempId: string;
  alignment: WorkAlignment | null;
  data: CreateDocumentReq;
}

const DocumentTemp: React.FC<DocumentProps> = ({ tempId, alignment: initialAlignment, data: initialData }) => {
  const { createdProjectElements, setCreatedProjectElements } = useProjectElementListStoreForUpdate();

  const handleAlignmentChange = (value: WorkAlignment) => {
    const updatedProjectElementList = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, documentAlignment: value } : each
    );
    setCreatedProjectElements(updatedProjectElementList);
  };

  const handlechange = (field: keyof CreateDocumentReq, value: string) => {
    const newCreatedProjectElements: CreateProjectElementReq[] = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, createDocumentReq: { ...each.createDocumentReq, [field]: value } as CreateDocumentReq } : each
    )
    setCreatedProjectElements(newCreatedProjectElements);
  }

  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    const updatedCreatedProjectElements = createdProjectElements.map((each) =>
      each.tempId === tempId ? {
        ...each,
        createDocumentReq: {
          ...each.createWorkReq,
          thumbnailUrl,
          originUrl,
        } as CreateDocumentReq
      } : each);
    setCreatedProjectElements(updatedCreatedProjectElements);
  }


  return (
    <DocumentWrapper>
      <ImgWrapper>
        <WorkImage
          src={initialData.originUrl === '' ? defaultImg : initialData.originUrl}
          alt={initialData.description}
          $displaySize={WorkDisplaySize.REGULAR}
        />
        <ReplaceImageButton setImageUrl={(thumbnailUrl: string, originUrl: string) => setOriginThumbnailUrl(thumbnailUrl, originUrl)} />
      </ImgWrapper>

      <SelectBoxContainer>
        <SelectBox
          value={initialAlignment || WorkAlignment.CENTER}
          selectType={SelectType.WORK_ALIGNMENT}
          handleChange={handleAlignmentChange} />
      </SelectBoxContainer>
      <HeadlessTextArea
        alignment={initialAlignment || WorkAlignment.CENTER}
        content={initialData.description}
        placeholder={"text"}
        handleChange={(e) => handlechange("description", e.target.value)}
        StyledTextArea={TextAreaTextBox}
      />
    </DocumentWrapper>
  );
}

export default DocumentTemp;