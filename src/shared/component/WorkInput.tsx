import React from 'react';
import styled from 'styled-components';


export interface WorkProps {
  type: string;
  value: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WorkInput: React.FC<WorkProps> = ({ type, value, placeholder, handleChange }) => {
  return (
    <Input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};


const Input = styled.input`
  height: 18px;
  width: 100px;
  padding: 0 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  outline: none;
`;

export default WorkInput;
