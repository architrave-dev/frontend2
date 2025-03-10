import React, { useRef } from 'react';
import { TextAlignment, DisplayAlignment } from '../../../enum/EnumRepository';
import { StyledTextAreaComponent } from '../../../dto/StyleCompRepository';


export interface HeadlessTextAreaProps {
  alignment: TextAlignment;
  content: string;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  StyledTextArea: StyledTextAreaComponent
}

export type Alignment = TextAlignment | DisplayAlignment;


const HeadlessTextArea: React.FC<HeadlessTextAreaProps> = ({
  alignment,
  content,
  placeholder,
  handleChange,
  StyledTextArea
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const calculateRows = (content: string): number => {
    const lineBreaks = content.split('\n').length;
    return Math.max(lineBreaks, 1); // Ensure at least 1 row
  }

  return (
    <StyledTextArea
      ref={textareaRef}
      $alignment={alignment}
      value={content}
      placeholder={placeholder}
      onChange={handleChange}
      rows={calculateRows(content)}
    />
  );
}


export default HeadlessTextArea;