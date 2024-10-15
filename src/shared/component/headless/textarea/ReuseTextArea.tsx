import React, { useRef } from 'react';
import styled from 'styled-components';
import { TextBoxAlignment, WorkAlignment } from '../../SelectBox';
import { getAlignment } from './TextAreaBody';
import { TextArea } from '../../../enum/EnumRepository';


interface TextBoxAreaProps {
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
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  resize: none;
  overflow: hidden;
  text-align: ${({ $alignment }) => getAlignment($alignment)};
  ${({ theme, $type }) => {
    switch ($type) {
      case TextArea.WORK:
        return theme.typography.Body_03_1;
      default:
        return theme.typography.Body_02_1;
    }
  }}
`;

export default ReuseTextArea;