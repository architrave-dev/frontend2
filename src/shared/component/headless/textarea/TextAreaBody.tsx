import styled, { css } from 'styled-components';
import { Alignment } from './HeadlessTextArea';
import { TextAlignment, DisplayAlignment } from '../../../enum/EnumRepository';


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
export const TextAreaBillboard = styled.textarea<{ $alignment: Alignment }>`
  ${commonTextAreaStyles}
  text-align: ${({ $alignment }) => getAlignment($alignment)};
  width: 60%;
  min-height: 10vh;
  margin-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_White};
  color: ${({ theme }) => theme.colors.color_Gray_01};
  ${({ theme }) => theme.typography.Body_01_1};
`;

export const TextAreaWork = styled.textarea<{ $alignment: Alignment }>`
  ${commonTextAreaStyles}
  color: ${({ theme }) => theme.colors.color_Gray_04};
  text-align: ${({ $alignment }) => getAlignment($alignment)};
  ${({ theme }) => theme.typography.Body_03_1};
`;

export const TextAreaTextBox = styled.textarea<{ $alignment: Alignment }>`
  ${commonTextAreaStyles}

  width: 100%;
  padding: 8px 0px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};


  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: ${({ $alignment }) => getAlignment($alignment)};
  ${({ theme }) => theme.typography.Body_02_1};
`;

export const TextAreaWorkViewer = styled.textarea<{ $alignment: Alignment }>`
  ${commonTextAreaStyles}
  color: ${({ theme }) => theme.colors.color_Gray_04};
  text-align: ${({ $alignment }) => getAlignment($alignment)};
  ${({ theme }) => theme.typography.Body_03_2};
`;

export const TextAreaMemberInfo = styled.textarea<{ $alignment: Alignment }>`
  ${commonTextAreaStyles}
  color: ${({ theme }) => theme.colors.color_Gray_04};
  text-align: ${({ $alignment }) => getAlignment($alignment)};
  ${({ theme }) => theme.typography.Body_02_2};
`;

export const getAlignment = (alignment: Alignment): string => {
  switch (alignment) {
    case TextAlignment.LEFT:
    case DisplayAlignment.LEFT:
      return 'left';
    case TextAlignment.CENTER:
    case DisplayAlignment.CENTER:
      return 'center';
    case TextAlignment.RIGHT:
    case DisplayAlignment.RIGHT:
      return 'right';
    default:
      return 'center';
  }
};