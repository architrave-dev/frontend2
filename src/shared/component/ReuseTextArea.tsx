import React, { useRef } from 'react';
import styled from 'styled-components';
import { TextBoxAlignment, WorkAlignment } from './SelectBox';

export enum TextArea {
  WORK = 'WORK',
  TEXTBOX = 'TEXTBOX'
}

export interface TextBoxAreaProps {
  type: TextAreaType;
  alignment: Alignment;
  content: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}


type Alignment = TextBoxAlignment | WorkAlignment;
type TextAreaType = TextArea.WORK | TextArea.TEXTBOX;


const ReuseTextArea: React.FC<TextBoxAreaProps> = ({ type, alignment, placeholder, content, handleChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const calculateRows = (content: string): number => {
    const lineBreaks = content.split('\n').length;
    return Math.max(lineBreaks, 1); // Ensure at least 1 row
  }

  return (
    <TextAreaComp
      ref={textareaRef}
      $type={type}
      $alignment={alignment}
      value={content}
      placeholder={placeholder}
      onChange={handleChange}
      rows={calculateRows(content)}
    />
  );
}

const TextAreaComp = styled.textarea<{ $type: TextAreaType, $alignment: Alignment }>`
      width: 100%;
      padding: 8px 0px;
      color: ${({ $type, theme }) => $type === TextArea.WORK ?
    theme.colors.color_Gray_04 : theme.colors.color_Gray_03};
      font-size: ${({ $type, theme }) => $type === TextArea.WORK ?
    theme.fontSize.font_B03 : theme.fontSize.font_B02};
      background-color: transparent;
      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
      resize: none;
      overflow: hidden;
      text-align: ${({ $alignment }) => getAlignment($alignment)};
      `;

export const getAlignment = (alignment: Alignment): string => {
  switch (alignment) {
    case TextBoxAlignment.LEFT:
    case WorkAlignment.LEFT:
      return 'left';
    case TextBoxAlignment.CENTER:
    case WorkAlignment.CENTER:
      return 'center';
    case TextBoxAlignment.RIGHT:
    case WorkAlignment.RIGHT:
      return 'right';
    default:
      return 'center';
  }
};

export default ReuseTextArea;