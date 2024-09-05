import React from 'react';
import styled from 'styled-components';

export enum ReuseInputType {
  NAME = 'NAME',
  VALUE = 'VALUE',
  NAME_NEW = 'NAME_NEW',
  VALUE_NEW = 'VALUE_NEW',
  WORK = 'WORK'
}

interface ReuseInputProps {
  type: ReuseInputType;
  value: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReuseInput: React.FC<ReuseInputProps> = ({
  type,
  value,
  placeholder,
  handleChange }) => {
  return (
    <InfoInputComp
      $type={type}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}

const InfoInputComp = styled.input<{ $type: ReuseInputType }>`
  width: ${({ $type }) => {
    switch ($type) {
      case ReuseInputType.NAME:
      case ReuseInputType.NAME_NEW:
        return '18vw';
      case ReuseInputType.WORK:
        return '100px';
      default:
        return '50vw';
    }
  }};
  padding: 0px 8px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme, $type }) => {
    switch ($type) {
      case ReuseInputType.NAME_NEW:
      case ReuseInputType.VALUE_NEW:
      case ReuseInputType.WORK:
        return theme.colors.color_Gray_05;
      default:
        return theme.colors.color_Gray_06;
    }
  }};
  outline: none;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme, $type }) => {
    switch ($type) {
      case ReuseInputType.WORK:
        return theme.fontSize.font_B04;
      default:
        return theme.fontSize.font_B03
    }
  }};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

export default ReuseInput;
