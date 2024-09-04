import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export interface WorkTextAreaProps {
  content: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const WorkTextArea: React.FC<WorkTextAreaProps> = ({ content, handleChange, placeholder }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      console.log("textarea.scrollHeight: ", `${textarea.scrollHeight}`)
      textarea.style.height = 'auto'; // 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // scrollHeight를 기준으로 높이 설정
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  return (
    <Textarea
      ref={textareaRef}
      value={content}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

const Textarea = styled.textarea`
  width: 100%;
  height: 18px;
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  color: ${({ theme }) => theme.colors.color_Gray_04};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  outline: none;
  text-align: center;
  resize: none; 
  overflow: hidden;
`;


export default WorkTextArea;
