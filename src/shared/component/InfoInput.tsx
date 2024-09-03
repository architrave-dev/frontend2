import React from 'react';
import styled from 'styled-components';

export enum InputType {
  NAME = 'NAME',
  VALUE = 'VALUE',
  NAME_NEW = 'NAME_NEW',
  VALUE_NEW = 'VALUE_NEW',
}

interface InfoInputProps {
  type: InputType;
  value: string;
  placeholder: string;
  handlechange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InfoInput: React.FC<InfoInputProps> = ({
  type,
  value,
  placeholder,
  handlechange }) => {

  return (
    <InfoInputComp
      $type={type}
      value={value}
      placeholder={placeholder}
      onChange={handlechange}
    />
  );
}

const InfoInputComp = styled.input<{ $type: InputType }>`
  width: ${({ $type }) => {
    switch ($type) {
      case InputType.NAME:
      case InputType.NAME_NEW:
        return '18vw';
      default:
        return '50vw';
    }
  }};
  padding: 5px;
  background: transparent;
  border: none;
  box-sizing: border-box;
  border-bottom: 2px solid ${({ theme, $type }) => {
    switch ($type) {
      case InputType.NAME_NEW:
      case InputType.VALUE_NEW:
        return theme.colors.color_Gray_05;
      default:
        return theme.colors.color_Gray_06;
    }
  }};
  outline: none;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

export default InfoInput;
