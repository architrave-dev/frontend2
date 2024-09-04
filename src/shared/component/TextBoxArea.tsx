import React, { useRef } from 'react';
import styled from 'styled-components';
import { TextBoxAlignment } from './SelectBox';


export interface TextBoxAreaProps {
  alignment: TextBoxAlignment;
  content: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextBoxArea: React.FC<TextBoxAreaProps> = ({ alignment, content, handleChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const calculateRows = (content: string): number => {
    const lineBreaks = content.split('\n').length;
    return Math.max(lineBreaks, 1); // Ensure at least 1 row
  }

  return (
    <TextArea
      ref={textareaRef}
      $textBoxAlignment={alignment}
      value={content}
      onChange={handleChange}
      rows={calculateRows(content)}
    />
  );
}

const TextArea = styled.textarea<{ $textBoxAlignment: TextBoxAlignment }>`
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

export const getAlignment = (alignment: TextBoxAlignment): string => {
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

export default TextBoxArea;