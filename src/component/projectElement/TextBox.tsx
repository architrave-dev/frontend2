import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import SelectBox from '../../shared/component/SelectBox';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaTextBox, getAlignment } from '../../shared/component/headless/textarea/TextAreaBody';
import { TextBoxData } from '../../shared/dto/EntityRepository';
import { SelectType, TextAlignment } from '../../shared/enum/EnumRepository';
import { UpdateProjectElementReq, UpdateTextBoxReq } from '../../shared/dto/ReqDtoRepository';


export interface TextBoxProps {
  alignment: TextAlignment | null;
  data: TextBoxData;
}

const TextBox: React.FC<TextBoxProps> = ({ alignment: initialTexBoxAlignment, data: initialData }) => {
  const { isEditMode } = useEditMode();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { updatedProjectElements, setUpdatedProjectElements } = useProjectElementListStoreForUpdate();

  const handleAlignmentChange = (value: TextAlignment) => {
    const targetElement = updatedProjectElements.find(pe => pe.updateTextBoxReq?.id === initialData.id);
    if (targetElement) {
      const updatedProjectElementList = updatedProjectElements.map(each =>
        each.updateTextBoxReq?.id === initialData.id ? { ...each, textBoxAlignment: value } : each
      )
      setUpdatedProjectElements(updatedProjectElementList);
    } else {
      const target = projectElementList.find(pe => pe.textBox?.id === initialData.id);
      if (!target) return;

      const newUpdateProjectElementReq: UpdateProjectElementReq = {
        projectElementId: target.id,
        updateWorkReq: null,
        workAlignment: null,
        workDisplaySize: null,
        updateTextBoxReq: initialData,
        textBoxAlignment: value,
        updateDocumentReq: null,
        documentAlignment: null,
        dividerType: null
      }
      setUpdatedProjectElements([...updatedProjectElements, newUpdateProjectElementReq]);
    }
    const updatedProjectElementList = projectElementList.map(each =>
      each.textBox?.id === initialData.id ? { ...each, textBoxAlignment: value } : each
    );
    setProjectElementList(updatedProjectElementList);
  };


  const handlechange = (field: keyof TextBoxData, value: string) => {
    const targetElement = updatedProjectElements.find(pe => pe.updateTextBoxReq?.id === initialData.id);
    if (targetElement) {
      //updatedProjectElements에 있다면
      const updatedProjectElementList = updatedProjectElements.map(each =>
        each.updateTextBoxReq?.id === initialData.id ? { ...each, updateTextBoxReq: { ...each.updateTextBoxReq, [field]: value } as UpdateTextBoxReq } : each
      )
      setUpdatedProjectElements(updatedProjectElementList);
    } else {
      //updatedProjectElements에 없다면
      const target = projectElementList.find(pe => pe.textBox?.id === initialData.id);

      if (!target) return;
      const targetTextBox = target.textBox;
      if (!targetTextBox) return;
      //target으로 UpdateProjectElementReq 를 생성 후 
      const convetedToProjectElementReq: UpdateProjectElementReq = {
        projectElementId: target.id,
        updateWorkReq: null,
        workAlignment: null,
        updateTextBoxReq: {
          id: targetTextBox.id,
          content: targetTextBox.content
        },
        textBoxAlignment: target.textBoxAlignment,
        updateDocumentReq: null,
        documentAlignment: null,
        dividerType: null
      }
      const newUpdateProjectElementReq: UpdateProjectElementReq = {
        ...convetedToProjectElementReq,
        updateTextBoxReq: {
          ...convetedToProjectElementReq.updateTextBoxReq,
          [field]: value
        } as UpdateTextBoxReq
      };
      //projectElementList에서 id로 찾고
      //updatedProjectElements에 추가한다.
      setUpdatedProjectElements([...updatedProjectElements, { ...newUpdateProjectElementReq }]);
    }

    const updatedProjectElementList = projectElementList.map(each =>
      each.textBox?.id === initialData.id ? { ...each, textBox: { ...each.textBox, [field]: value } as TextBoxData } : each
    );
    setProjectElementList(updatedProjectElementList);
  }

  return (
    <TextBoxWrapper>
      {isEditMode ? (
        <>
          <SelectBoxContainer>
            <SelectBox
              value={initialTexBoxAlignment || TextAlignment.CENTER}
              selectType={SelectType.TEXTBOX_ALIGNMENT}
              handleChange={handleAlignmentChange} />
          </SelectBoxContainer>
          <HeadlessTextArea
            alignment={initialTexBoxAlignment || TextAlignment.CENTER}
            content={initialData.content}
            placeholder={"text"}
            handleChange={(e) => handlechange("content", e.target.value)}
            StyledTextArea={TextAreaTextBox}
          />
        </>
      ) : (
        <TextBoxContent $textBoxAlignment={initialTexBoxAlignment || TextAlignment.CENTER}>
          {initialData.content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}<br />
            </React.Fragment>
          ))}
        </TextBoxContent>
      )}
    </TextBoxWrapper>
  );
}

export const TextBoxWrapper = styled.div`
  position: relative;
  min-height: 80px;
`;

export const SelectBoxContainer = styled.div`
  position: absolute;
  top: -30px;
  width: 100%;
  display: flex;
  gap: 20px;
`

const TextBoxContent = styled.div<{ $textBoxAlignment: TextAlignment }>`
  padding: 8px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: ${({ $textBoxAlignment }) => getAlignment($textBoxAlignment)};
  ${({ theme }) => theme.typography.Body_02_2};
`;

export default TextBox;