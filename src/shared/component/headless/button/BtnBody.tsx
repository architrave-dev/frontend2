import styled, { css } from 'styled-components';

const commonBtnStyles = css`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
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
  z-index:2; 
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

export const BtnWorkViewerBlack = styled.button`
  ${commonBtnStyles}
  background-color: ${({ theme }) => theme.colors.color_Gray_01};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_03};
  }
  color: ${({ theme }) => theme.colors.color_White};
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

export const OriginBtnBottom = styled.button`
  ${commonBtnStyles}
  position: absolute;
  bottom: -1.8rem;
  right: 0px;
  
  padding: 0.2rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.color_White};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};

  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_04};
`;

export const OriginBtnRight = styled.button`
  ${commonBtnStyles}
  position: absolute;
  bottom: 0px;
  right: -3.4rem;
  
  padding: 0.2rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.color_White};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};

  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_04};
`;

export const SmallestBtn = styled.button`
  ${commonBtnStyles}
  padding: 0.2rem 0.3rem;
  background-color: ${({ theme }) => theme.colors.color_White};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};

  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_04};
`;

export const BtnModalMain = styled.button`
  ${commonBtnStyles}
  background-color: ${({ theme }) => theme.colors.color_Gray_02};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_04};
  }
  color: ${({ theme }) => theme.colors.color_White};
  ${({ theme }) => theme.typography.Body_03_2};
`;
export const BtnModalSub = styled.button`
  ${commonBtnStyles}
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  background-color: ${({ theme }) => theme.colors.color_White};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_2};
`;