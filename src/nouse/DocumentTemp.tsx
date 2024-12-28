import React from 'react';
import { useProjectElementListStoreForUpdate } from '../shared/store/projectElementStore';
import SelectBox from '../shared/component/SelectBox';
import { SelectBoxContainer } from '../component/projectElement/TextBox';
import HeadlessTextArea from '../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaTextBox } from '../shared/component/headless/textarea/TextAreaBody';
import { SelectType, WorkDisplaySize, TextAlignment } from '../shared/enum/EnumRepository';
import { CreateDocumentReq, CreateProjectElementReq } from '../shared/dto/ReqDtoRepository';
import { DocumentWrapper, ImgWrapper } from '../component/projectElement/Document';
import { SelectBoxWrapper, WorkImage } from '../component/projectElement/Work';
import MoleculeImg from '../shared/component/molecule/MoleculeImg';


export interface DocumentProps {
  tempId: string;
  alignment: TextAlignment;
  data: CreateDocumentReq;
}

const DocumentTemp: React.FC<DocumentProps> = ({ tempId, alignment: initialAlignment, data: initialData }) => {
  return null;
  // const { createdProjectElements, setCreatedProjectElements } = useProjectElementListStoreForUpdate();

  // const handleAlignmentChange = (value: TextAlignment) => {
  //   const updatedProjectElementList = createdProjectElements.map(each =>
  //     each.tempId === tempId ? { ...each, documentAlignment: value } : each
  //   );
  //   setCreatedProjectElements(updatedProjectElementList);
  // };

  // const handlechange = (field: keyof CreateDocumentReq, value: string) => {
  //   const newCreatedProjectElements: CreateProjectElementReq[] = createdProjectElements.map(each =>
  //     each.tempId === tempId ? { ...each, createDocumentReq: { ...each.createDocumentReq, [field]: value } as CreateDocumentReq } : each
  //   )
  //   setCreatedProjectElements(newCreatedProjectElements);
  // }

  // const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
  //   const updatedCreatedProjectElements = createdProjectElements.map((each) =>
  //     each.tempId === tempId ? {
  //       ...each,
  //       createDocumentReq: {
  //         ...each.createDocumentReq,
  //         originUrl,
  //         thumbnailUrl,
  //       } as CreateDocumentReq
  //     } : each);
  //   setCreatedProjectElements(updatedCreatedProjectElements);
  // }


  // return (
  //   <DocumentWrapper>
  //     <SelectBoxContainer>
  //       <SelectBoxWrapper>
  //         <SelectBox
  //           value={initialAlignment}
  //           selectType={SelectType.TEXT_ALIGNMENT}
  //           handleChange={handleAlignmentChange}
  //           direction={false} />
  //       </SelectBoxWrapper>
  //     </SelectBoxContainer>
  //     <ImgWrapper>
  //       <MoleculeImg
  //         srcUrl={initialData.originUrl}
  //         alt={initialData.description}
  //         displaySize={WorkDisplaySize.REGULAR}
  //         handleChange={(thumbnailUrl: string, originUrl: string) => setOriginThumbnailUrl(thumbnailUrl, originUrl)}
  //         StyledImg={WorkImage}
  //       />
  //     </ImgWrapper>
  //     <HeadlessTextArea
  //       alignment={initialAlignment}
  //       content={initialData.description}
  //       placeholder={"text"}
  //       handleChange={(e) => handlechange("description", e.target.value)}
  //       StyledTextArea={TextAreaTextBox}
  //     />
  //   </DocumentWrapper>
  // );
}

export default DocumentTemp;