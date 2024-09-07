import React from 'react';

type StyledInputComponent = React.ComponentType<React.InputHTMLAttributes<HTMLInputElement>>;

interface HeadlessInputProps {
  type?: string;
  value: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyBoard?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  StyledInput: StyledInputComponent;
}

const HeadlessInput: React.FC<HeadlessInputProps> = ({
  type,
  value,
  placeholder,
  handleChange,
  StyledInput
}) => {
  return (
    <StyledInput
      type={type ? type : 'text'}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default HeadlessInput;