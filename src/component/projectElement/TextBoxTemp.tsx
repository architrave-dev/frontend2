import React, { useRef } from 'react';
import styled from 'styled-components';
import { CreateProjectElementReq, CreateTextBoxReq, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import SelectBox, { SelectType, TextBoxAlignment } from '../../shared/component/SelectBox';


export interface TextBoxProps {
  tempId: string;
  alignment: TextBoxAlignment | null;
  data: CreateTextBoxReq;
}

const TextBoxTemp: React.FC<TextBoxProps> = ({ tempId, alignment: initialTexBoxAlignment, data: initialData }) => {
  const { createdProjectElements, setCreatedProjectElements } = useProjectElementListStoreForUpdate();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleAlignmentChange = (value: TextBoxAlignment) => {
    const updatedProjectElementList = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, textBoxAlignment: value } : each
    );
    setCreatedProjectElements(updatedProjectElementList);
  };

  const handlechange = (field: keyof CreateTextBoxReq, value: string) => {
    const newCreatedProjectElements: CreateProjectElementReq[] = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, createTextBoxReq: { ...each.createTextBoxReq, [field]: value } as CreateTextBoxReq } : each
    )
    setCreatedProjectElements(newCreatedProjectElements);
  }

  const calculateRows = (content: string): number => {
    const lineBreaks = content.split('\n').length;
    return Math.max(lineBreaks, 1); // Ensure at least 1 row
  }

  return (
    <TextBoxWrapper>
      <SelectBox
        value={initialTexBoxAlignment || TextBoxAlignment.CENTER}
        selectType={SelectType.TEXTBOX_ALIGNMENT}
        handleChange={handleAlignmentChange} />
      <TextArea
        ref={textAreaRef}
        $textBoxAlignment={initialTexBoxAlignment}
        value={initialData.content}
        onChange={(e) => handlechange("content", e.target.value)}
        rows={calculateRows(initialData.content)}
      />
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

export default TextBoxTemp;