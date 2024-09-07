import React from 'react';
import styled, { DefaultTheme, css } from 'styled-components';

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
    <InputCommon
      $type={type}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}

const getTypeStyles = (theme: DefaultTheme, $type: ReuseInputType) => {
  switch ($type) {
    case ReuseInputType.NAME:
      return css`
        width: 18vw;
        border-bottom: 2px solid ${theme.colors.color_Gray_06};
        ${theme.typography.Body_03_2};
      `;
    case ReuseInputType.NAME_NEW:
      return css`
        width: 18vw;
        border-bottom: 2px solid ${theme.colors.color_Gray_05};
        ${theme.typography.Body_03_2};
      `;
    case ReuseInputType.VALUE:
      return css`
        width: 50vw;
        border-bottom: 2px solid ${theme.colors.color_Gray_06};
        ${theme.typography.Body_03_2};
      `;
    case ReuseInputType.VALUE_NEW:
      return css`
        width: 50vw;
        border-bottom: 2px solid ${theme.colors.color_Gray_05};
        ${theme.typography.Body_03_2};
      `;
    case ReuseInputType.WORK:
      return css`
        width: 100px;
        border-bottom: 2px solid ${theme.colors.color_Gray_05};
        ${theme.typography.Body_04};
      `;
    default:
      return;
  }
};

const InputCommon = styled.input<{ $type: ReuseInputType }>`
  padding: 0px 8px;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  &:focus {
    outline: none;
  }
  ${({ theme, $type }) => getTypeStyles(theme, $type)};
`;

export default ReuseInput;
