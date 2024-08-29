import React, { useRef } from 'react';
import styled from 'styled-components';
import { CreateProjectElementReq, CreateTextBoxReq, TextBoxAlignment, TextBoxData, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';


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


  return (
    <TextBoxWrapper>
      <AlignmentSelect value={initialTexBoxAlignment || ''} onChange={(e) => handleAlignmentChange(e.target.value as TextBoxAlignment)}>
        <option value={TextBoxAlignment.LEFT}>Left</option>
        <option value={TextBoxAlignment.CENTER}>Center</option>
        <option value={TextBoxAlignment.RIGHT}>Right</option>
      </AlignmentSelect>
      <TextArea
        ref={textAreaRef}
        $textBoxAlignment={initialTexBoxAlignment}
        value={initialData.content}
        onChange={(e) => handlechange("content", e.target.value)}
        rows={1}
      />
    </TextBoxWrapper>
  );
}

const TextBoxWrapper = styled.div`
  position: relative;
  min-height: 80px;
`;

const AlignmentSelect = styled.select`
  position: absolute;
  top: -40px;
  width: 100px;
  padding: 2px;
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  color: ${({ theme }) => theme.colors.color_Gray_03};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  border-radius: 1px;
  &:focus {
    outline: none;
  }
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