import React, { useRef } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { TextBoxData, UpdateProjectElementReq, UpdateTextBoxReq, useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import SelectBox, { SelectType, TextBoxAlignment } from '../../shared/component/SelectBox';


export interface TextBoxProps {
  alignment: TextBoxAlignment | null;
  data: TextBoxData;
}

const TextBox: React.FC<TextBoxProps> = ({ alignment: initialTexBoxAlignment, data: initialData }) => {
  const { isEditMode } = useEditMode();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { updatedProjectElements, setUpdatedProjectElements } = useProjectElementListStoreForUpdate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAlignmentChange = (value: TextBoxAlignment) => {
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
        id: target.id,
        updateWorkReq: null,
        workAlignment: null,
        updateTextBoxReq: initialData,
        textBoxAlignment: value,
        dividerType: null,
        peOrder: target.peOrder
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
        id: target.id,
        updateWorkReq: null,
        workAlignment: null,
        updateTextBoxReq: {
          id: targetTextBox.id,
          content: targetTextBox.content,
          isDeleted: targetTextBox.isDeleted
        },
        textBoxAlignment: target.textBoxAlignment,
        dividerType: null,
        peOrder: target.peOrder
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

  const calculateRows = (content: string): number => {
    const lineBreaks = content.split('\n').length;
    return Math.max(lineBreaks, 1); // Ensure at least 1 row
  }

  return (
    <TextBoxWrapper>
      {isEditMode ? (
        <>
          <SelectBox
            value={initialTexBoxAlignment || TextBoxAlignment.CENTER}
            selectType={SelectType.TEXTBOX_ALIGNMENT}
            handleChange={handleAlignmentChange} />
          <TextArea
            ref={textareaRef}
            $textBoxAlignment={initialTexBoxAlignment}
            value={initialData.content}
            onChange={(e) => handlechange("content", e.target.value)}
            rows={calculateRows(initialData.content)}
          />
        </>
      ) : (
        <TextBoxContent $textBoxAlignment={initialTexBoxAlignment}>
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

const TextBoxWrapper = styled.div`
      position: relative;
      min-height: 80px;
      `;

const TextArea = styled.textarea<{ $textBoxAlignment: TextBoxAlignment | null }>`
      width: 100%;
      padding: 8px 0px;
      color: ${({ theme }) => theme.colors.color_Gray_03};
      font-size: ${({ theme }) => theme.fontSize.font_B02};
      background-color: transparent;
      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
      resize: none;
      overflow: hidden;
      text-align: ${({ $textBoxAlignment }) => getAlignment($textBoxAlignment)};
      &:focus {
        outline: none;
  }
      `;

const TextBoxContent = styled.p<{ $textBoxAlignment: TextBoxAlignment | null }>`
      padding: 8px 0px;
      color: ${({ theme }) => theme.colors.color_Gray_03};
      font-size: ${({ theme }) => theme.fontSize.font_B02};
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      text-align: ${({ $textBoxAlignment }) => getAlignment($textBoxAlignment)};
      `;

const getAlignment = (alignment: TextBoxAlignment | null): string => {
  switch (alignment) {
    case TextBoxAlignment.LEFT:
      return 'left';
    case TextBoxAlignment.CENTER:
      return 'center';
    case TextBoxAlignment.RIGHT:
      return 'right';
    default:
      return 'center';
  }
};

export default TextBox;