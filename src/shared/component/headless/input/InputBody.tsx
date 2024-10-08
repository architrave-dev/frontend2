import styled, { css } from 'styled-components';

const commonInputStyles = css`
  padding: 0px 8px;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  &:focus {
    outline: none;
  }
`;

export const InputName = styled.input`
  ${commonInputStyles}
  width: 18vw;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_06};
  ${({ theme }) => theme.typography.Body_03_2};
`;
export const InputNameNew = styled.input`
  ${commonInputStyles}
  width: 18vw;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_05};
  ${({ theme }) => theme.typography.Body_03_2};
`;
export const InputValue = styled.input`
  ${commonInputStyles}
  width: 50vw;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_06};
  ${({ theme }) => theme.typography.Body_03_2};
`;
export const InputValueNew = styled.input`
  ${commonInputStyles}
  width: 50vw;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_05};
  ${({ theme }) => theme.typography.Body_03_2};
`;
export const InputWork = styled.input`
  ${commonInputStyles}
  width: 100px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  ${({ theme }) => theme.typography.Body_04};
`;
export const InputWorkTitle = styled.input`
  ${commonInputStyles}
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  text-align: center;
  ${({ theme }) => theme.typography.Body_02_2};
`;
export const InputBilboard = styled.input`
  ${commonInputStyles}
  width: 70%;
  color: ${({ theme }) => theme.colors.color_Gray_01};
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_White};
  ${({ theme }) => theme.typography.H_01};
`;
export const InputTitle = styled.input`
  ${commonInputStyles}
  width: 100%;
  color: ${({ theme }) => theme.colors.color_Gray_01};
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_06};
  ${({ theme }) => theme.typography.H_015};
`;

const commonInputBoxStyles = css`
  padding: 10px;
  background: transparent;
  outline: none;
  &:focus {
    outline: none;
  }
`;

export const InputBox = styled.input`
  ${commonInputBoxStyles}
  width: 400px;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  background-color: ${({ theme }) => theme.colors.color_Gray_06};
  ${({ theme }) => theme.typography.Body_02_2};
`;
export const InputAuth = styled.input`
  ${commonInputBoxStyles}
  width: 100%;
  color: ${({ theme }) => theme.colors.color_Gray_01};
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  ${({ theme }) => theme.typography.Body_02_2};
`;

export const InputWorkName = styled.input`
  ${commonInputBoxStyles}
  width: 100%;
  padding: 3px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_06};
  ${({ theme }) => theme.typography.Body_03_2};
`;