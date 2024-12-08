import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import SelectBox from '../../shared/component/SelectBox';
import { TextAreaTextBox, getAlignment } from '../../shared/component/headless/textarea/TextAreaBody';
import { DocumentData, ProjectElementData } from '../../shared/dto/EntityRepository';
import { SelectType, TextAlignment, WorkDisplaySize } from '../../shared/enum/EnumRepository';
import { UpdateDocumentReq, UpdateProjectElementReq } from '../../shared/dto/ReqDtoRepository';
import { ImgWrapper, SelectBoxWrapper, WorkImage } from './Work';
import MoleculeImg from '../../shared/component/molecule/MoleculeImg';
import MoleculeTextareaDescription from '../../shared/component/molecule/MoleculeTextareaDescription';
import MoleculeShowOriginBtn from '../../shared/component/molecule/MoleculeShowOriginBtn';
import { OriginBtnRight } from '../../shared/component/headless/button/BtnBody';


export interface DocumentProps {
  alignment: TextAlignment;
  data: DocumentData;
}

const Document: React.FC<DocumentProps> = ({ alignment: initialAlignment, data: initialData }) => {
  const { isEditMode } = useEditMode();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { updatedProjectElements, setUpdatedProjectElements } = useProjectElementListStoreForUpdate();

  const handleAlignmentChange = (value: TextAlignment) => {
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


  const handleChange = (field: keyof DocumentData, value: string) => {
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
        workDisplaySize: null,
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

  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    const targetElement = updatedProjectElements.find(pe => pe.updateDocumentReq?.id === initialData.id);
    if (targetElement) {
      //updatedProjectElements에 있다면
      const updatedProjectElementList = updatedProjectElements.map(each =>
        each.updateDocumentReq?.id === initialData.id ? { ...each, updateDocumentReq: { ...each.updateDocumentReq, thumbnailUrl, originUrl } as UpdateDocumentReq } : each
      )
      setUpdatedProjectElements(updatedProjectElementList);
    } else {
      //updatedProjectElements에 없다면
      const target = projectElementList.find(pe => pe.document?.id === initialData.id);

      if (!target) return;
      const targetDocument = target.document;
      if (!targetDocument) return;
      //target으로 UpdateProjectElementReq 를 생성 후??
      const convetedToProjectElementReq: UpdateProjectElementReq = {
        projectElementId: target.id,
        updateWorkReq: null,
        workAlignment: null,
        workDisplaySize: null,
        updateTextBoxReq: null,
        textBoxAlignment: null,
        updateDocumentReq: {
          id: targetDocument.id,
          originUrl: targetDocument.originUrl,
          thumbnailUrl: targetDocument.thumbnailUrl,
          description: targetDocument.description,
        } as UpdateDocumentReq,
        documentAlignment: target.documentAlignment,
        dividerType: null
      }
      //projectElementList에서 id로 찾고
      //updatedProjectElements에 추가한다.
      const newUpdateProjectElementReq: UpdateProjectElementReq = {
        ...convetedToProjectElementReq,
        updateDocumentReq: {
          ...convetedToProjectElementReq.updateDocumentReq,
          thumbnailUrl,
          originUrl
        } as UpdateDocumentReq
      };
      setUpdatedProjectElements([...updatedProjectElements, newUpdateProjectElementReq]);
    }
    const updatedProjectElementList: ProjectElementData[] = projectElementList.map(each =>
      each.work?.id === initialData.id ? { ...each, document: { ...each.document, thumbnailUrl, originUrl } as DocumentData } : each
    )
    setProjectElementList(updatedProjectElementList);
  }

  return (
    <DocumentWrapper>
      {isEditMode &&
        <SelectBoxContainer>
          <SelectBoxWrapper>
            <SelectBox
              value={initialAlignment}
              selectType={SelectType.TEXT_ALIGNMENT}
              handleChange={handleAlignmentChange}
              direction={false} />
          </SelectBoxWrapper>
        </SelectBoxContainer>
      }
      <ImgWrapper>
        <MoleculeShowOriginBtn originUrl={initialData.originUrl} styledBtn={OriginBtnRight} />
        <MoleculeImg
          srcUrl={initialData.originUrl}
          alt={initialData.description}
          displaySize={WorkDisplaySize.REGULAR}
          handleChange={(thumbnailUrl: string, originUrl: string) => setOriginThumbnailUrl(thumbnailUrl, originUrl)}
          StyledImg={WorkImage}
        />
      </ImgWrapper>
      <MoleculeTextareaDescription
        value={initialData.description}
        handleChange={(e) => handleChange('description', e.target.value)}
        alignment={initialAlignment}
        StyledTextarea={TextAreaTextBox}
        StyledDescription={DocumentContent}
      />
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

const DocumentContent = styled.div<{ $alignment: TextAlignment }>`
  width: 100%;
  padding: 8px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: ${({ $alignment }) => getAlignment($alignment)};
`;

export default Document;