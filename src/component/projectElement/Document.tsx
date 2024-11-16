import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import SelectBox from '../../shared/component/SelectBox';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { getAlignment } from '../../shared/component/headless/textarea/TextAreaBody';
import { DocumentData } from '../../shared/dto/EntityRepository';
import { SelectType, WorkAlignment } from '../../shared/enum/EnumRepository';
import { UpdateDocumentReq, UpdateProjectElementReq } from '../../shared/dto/ReqDtoRepository';


export interface DocumentProps {
  alignment: WorkAlignment | null;
  data: DocumentData;
}

const Document: React.FC<DocumentProps> = ({ alignment: initialAlignment, data: initialData }) => {
  const { isEditMode } = useEditMode();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { updatedProjectElements, setUpdatedProjectElements } = useProjectElementListStoreForUpdate();

  const handleAlignmentChange = (value: WorkAlignment) => {
    const targetElement = updatedProjectElements.find(pe => pe.updateDocumentReq?.id === initialData.id);
    if (targetElement) {
      const updatedProjectElementList = updatedProjectElements.map(each =>
        each.updateDocumentReq?.id === initialData.id ? { ...each, documentAlignment: value } : each
      )
      setUpdatedProjectElements(updatedProjectElementList);
    } else {
      const target = projectElementList.find(pe => pe.document?.id === initialData.id);
      if (!target) return;

      const newUpdateProjectElementReq: UpdateProjectElementReq = {
        projectElementId: target.id,
        updateWorkReq: null,
        workAlignment: null,
        workDisplaySize: null,
        updateTextBoxReq: null,
        textBoxAlignment: null,
        updateDocumentReq: initialData,
        documentAlignment: value,
        dividerType: null
      }
      setUpdatedProjectElements([...updatedProjectElements, newUpdateProjectElementReq]);
    }
    const updatedProjectElementList = projectElementList.map(each =>
      each.document?.id === initialData.id ? { ...each, documentAlignment: value } : each
    );
    setProjectElementList(updatedProjectElementList);
  };


  const handlechange = (field: keyof DocumentData, value: string) => {
    const targetElement = updatedProjectElements.find(pe => pe.updateDocumentReq?.id === initialData.id);
    if (targetElement) {
      //updatedProjectElements에 있다면
      const updatedProjectElementList = updatedProjectElements.map(each =>
        each.updateDocumentReq?.id === initialData.id ? { ...each, updateDocumentReq: { ...each.updateDocumentReq, [field]: value } as UpdateDocumentReq } : each
      )
      setUpdatedProjectElements(updatedProjectElementList);
    } else {
      //updatedProjectElements에 없다면
      const target = projectElementList.find(pe => pe.document?.id === initialData.id);

      if (!target) return;
      const targetDocument = target.document;
      if (!targetDocument) return;
      //target으로 UpdateProjectElementReq 를 생성 후 
      const convetedToProjectElementReq: UpdateProjectElementReq = {
        projectElementId: target.id,
        updateWorkReq: null,
        workAlignment: null,
        updateTextBoxReq: null,
        textBoxAlignment: null,
        updateDocumentReq: {
          id: targetDocument.id,
          originUrl: targetDocument.originUrl,
          thumbnailUrl: targetDocument.thumbnailUrl,
          description: targetDocument.description,

        },
        documentAlignment: target.documentAlignment,
        dividerType: null
      }
      const newUpdateProjectElementReq: UpdateProjectElementReq = {
        ...convetedToProjectElementReq,
        updateDocumentReq: {
          ...convetedToProjectElementReq.updateDocumentReq,
          [field]: value
        } as UpdateDocumentReq
      };
      //projectElementList에서 id로 찾고
      //updatedProjectElements에 추가한다.
      setUpdatedProjectElements([...updatedProjectElements, { ...newUpdateProjectElementReq }]);
    }

    const updatedProjectElementList = projectElementList.map(each =>
      each.document?.id === initialData.id ? { ...each, document: { ...each.document, [field]: value } as DocumentData } : each
    );
    setProjectElementList(updatedProjectElementList);
  }

  return (
    <DocumentWrapper >
      <SelectBoxContainer>
        <SelectBox
          value={initialAlignment || WorkAlignment.CENTER}
          selectType={SelectType.WORK_ALIGNMENT}
          handleChange={handleAlignmentChange} />
      </SelectBoxContainer>
    </DocumentWrapper >
  );
}

export const DocumentWrapper = styled.div`
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

const DocumentContent = styled.div<{ $documentAlignment: WorkAlignment }>`
  padding: 8px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: ${({ $documentAlignment }) => getAlignment($documentAlignment)};
  ${({ theme }) => theme.typography.Body_02_2};
`;

export default Document;