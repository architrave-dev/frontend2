import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';

export enum TextBoxType {
  LEFT = 'Left',
  CENTER = 'Center',
  RIGHT = 'Right',
}

export interface TextBoxProps {
  texBoxType: TextBoxType;
  content: string;
}

const TextBox: React.FC<TextBoxProps> = ({ texBoxType: initialTexBoxType, content: initialContent }) => {
  const { isEditMode } = useEditMode();
  const [texBoxType, setTexBoxType] = useState(initialTexBoxType);
  const [content, setContent] = useState(initialContent);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleAlignmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTexBoxType(e.target.value as TextBoxType);
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
          <AlignmentSelect value={texBoxType} onChange={handleAlignmentChange}>
            <option value={TextBoxType.LEFT}>Left</option>
            <option value={TextBoxType.CENTER}>Center</option>
            <option value={TextBoxType.RIGHT}>Right</option>
          </AlignmentSelect>
          <TextArea
            ref={textAreaRef}
            $textBoxType={texBoxType}
            value={content}
            onChange={handleContentChange}
            rows={1}
          />
        </>
      ) : (
        <TextBoxContent $textBoxType={texBoxType}>{content}</TextBoxContent>
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

const TextArea = styled.textarea<{ $textBoxType: TextBoxType }>`
  width: 100%;
  min-height: 120px;
  padding: 8px;
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  color: ${({ theme }) => theme.colors.color_Gray_03};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  resize: none;
  overflow: hidden;
  text-align: ${({ $textBoxType }) => {
    switch ($textBoxType) {
      case TextBoxType.LEFT:
        return 'left';
      case TextBoxType.CENTER:
        return 'center';
      case TextBoxType.RIGHT:
        return 'right';
      default:
        return 'center';
    }
  }};
`;

const TextBoxContent = styled.p<{ $textBoxType: TextBoxType }>`
  text-align: ${({ $textBoxType }) => {
    switch ($textBoxType) {
      case TextBoxType.LEFT:
        return 'left';
      case TextBoxType.CENTER:
        return 'center';
      case TextBoxType.RIGHT:
        return 'right';
      default:
        return 'center';
    }
  }};
  color: ${({ theme }) => theme.colors.color_Gray_03};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;


export default TextBox;