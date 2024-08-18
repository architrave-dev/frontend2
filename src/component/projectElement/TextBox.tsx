import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { TextBoxAlignment, TextBoxData } from '../../shared/store/projectStore';


export interface TextBoxProps {
  alignment: TextBoxAlignment | null;
  data: TextBoxData;
}

const TextBox: React.FC<TextBoxProps> = ({ alignment: initialTexBoxAlignment, data: initialData }) => {
  const { isEditMode } = useEditMode();
  const [textBoxAlignment, setTextBoxAlignment] = useState(initialTexBoxAlignment);
  const [content, setContent] = useState(initialData.content);
  const [isDeleted, setIsDeleted] = useState(initialData.isDeleted);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleAlignmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextBoxAlignment(e.target.value as TextBoxAlignment);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <TextBoxWrapper>
      {isEditMode ? (
        <>
          <AlignmentSelect value={textBoxAlignment || ''} onChange={handleAlignmentChange}>
            <option value={TextBoxAlignment.LEFT}>Left</option>
            <option value={TextBoxAlignment.CENTER}>Center</option>
            <option value={TextBoxAlignment.RIGHT}>Right</option>
          </AlignmentSelect>
          <TextArea
            ref={textAreaRef}
            $textBoxAlignment={textBoxAlignment}
            value={content}
            onChange={handleContentChange}
            rows={1}
          />
        </>
      ) : (
        <TextBoxContent $textBoxAlignment={textBoxAlignment}>{content}</TextBoxContent>
      )}
    </TextBoxWrapper>
  );
}

const TextBoxWrapper = styled.div`
`;

const AlignmentSelect = styled.select`
  margin-bottom: 10px;
  padding: 5px;
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  color: ${({ theme }) => theme.colors.color_Gray_03};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  border-radius: 4px;
`;

const TextArea = styled.textarea<{ $textBoxAlignment: TextBoxAlignment | null }>`
  width: 100%;
  min-height: 120px;
  padding: 8px;
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  color: ${({ theme }) => theme.colors.color_Gray_03};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  resize: none;
  overflow: hidden;
  text-align: ${({ $textBoxAlignment }) => getAlignment($textBoxAlignment)};
`;

const TextBoxContent = styled.p<{ $textBoxAlignment: TextBoxAlignment | null }>`
  text-align: ${({ $textBoxAlignment }) => getAlignment($textBoxAlignment)};  
  color: ${({ theme }) => theme.colors.color_Gray_03};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
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