import styled, { css } from 'styled-components';

const commonBtnStyles = css`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  cursor: pointer;
`;

export const BtnCreate = styled.button`
  ${commonBtnStyles}
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  background-color: ${({ theme }) => theme.colors.color_White};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
  ${({ theme }) => theme.typography.Body_03_2};
`;

export const BtnCreateWide = styled.button`
  ${commonBtnStyles}
  width: 50vw;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  background-color: ${({ theme }) => theme.colors.color_White};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
  ${({ theme }) => theme.typography.Body_03_2};
`;

export const BtnDelete = styled.button`
  ${commonBtnStyles}
  position: absolute;
  right: 0px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.color_Gray_02};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_03};
  }
  color: ${({ theme }) => theme.colors.color_White};
  ${({ theme }) => theme.typography.Body_03_2};
`;

export const BtnConfirm = styled.button`
  ${commonBtnStyles}
  position: absolute;
  bottom: calc(8vh);
  right: calc(10vw);
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  background-color: ${({ theme }) => theme.colors.color_White};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
    }
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_2};
`;

export const BtnWorkDelete = styled.button`
  ${commonBtnStyles}
  background-color: ${({ theme }) => theme.colors.color_White};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_2};
`;

export const BtnWorkViewer = styled.button`
  ${commonBtnStyles}
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  background-color: ${({ theme }) => theme.colors.color_White};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_2};
`;

export const BtnCancel = styled.button`
  ${commonBtnStyles}
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  border-radius: 1px;
  background-color: ${({ theme }) => theme.colors.color_White};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Alpha_02};
  }
`;