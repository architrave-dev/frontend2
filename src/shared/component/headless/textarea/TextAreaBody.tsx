import styled, { css } from 'styled-components';
import { TextBoxAlignment, WorkAlignment } from '../../SelectBox';
import { Alignment } from './HeadlessTextArea';


const commonTextAreaStyles = css`
  width: 100%;
  padding: 8px 0px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  resize: none;
  overflow: hidden;
  &:focus {
    outline: none;
  }
`;

export const TextAreaWork = styled.textarea<{ $alignment: Alignment }>`
  ${commonTextAreaStyles}
  color: ${({ theme }) => theme.colors.color_Gray_04};
  text-align: ${({ $alignment }) => getAlignment($alignment)};
  ${({ theme }) => theme.typography.Body_03_1};
`;

export const TextAreaTextBox = styled.textarea<{ $alignment: Alignment }>`
  ${commonTextAreaStyles}
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: ${({ $alignment }) => getAlignment($alignment)};
  ${({ theme }) => theme.typography.Body_02_1};
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