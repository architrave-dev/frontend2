import styled, { css } from 'styled-components';

const commonInputStyles = css`
  padding: 4px 0px;
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
  width: 14vw;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_05};
  ${({ theme }) => theme.typography.Body_03_2};
`;
export const InputValue = styled.input`
  ${commonInputStyles}
  width: 50vw;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_05};
  ${({ theme }) => theme.typography.Body_03_2};
`;

export const InputNameNew = styled.input`
  ${commonInputStyles}
  width: 14vw;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_05};
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
export const InputBillboard = styled.input`
  ${commonInputStyles}
  width: 70%;
  margin-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_White};
  color: ${({ theme }) => theme.colors.color_Gray_01};
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

export const WorkViewerTitle = styled.input`
  ${commonInputStyles}
  width: 100%;
  height:28px;

  padding: 0px;
  margin-bottom: 2px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_03};
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_02_2};
`;

export const WorkViewerInfo = styled.input`
  ${commonInputStyles}
  width: 100%;
  height: 18px;

  padding: 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_04};
`;

export const MemberTitleInput = styled.input`
  ${commonInputStyles}
  width: 100%;
  height: fit-content;

  padding: 4px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.H_03};
`;

export const MemberInfoInput = styled.input`
  ${commonInputStyles}
  width: 100%;
  height: fit-content;

  padding: 5px 0px 4px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_02_2};
`;

export const MemberInfoValue = styled.input`
  ${commonInputStyles}
  width: 100%;
  height: fit-content;

  padding: 5px 0px 4px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_02_1};
`;

export const WorkDetailInputDescription = styled.input`
  ${commonInputStyles}
  width: 100%;
  height: 18px;

  padding: 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_04};

  text-align: right;
  ${({ theme }) => theme.typography.Body_03_2};
`;

export const ContactInput = styled.input`
  ${commonInputStyles}
  width: 100%;
  height: fit-content;

  padding: 3px 0px 2px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_02_1};
`;

export const SettingInput = styled.input`
  ${commonInputStyles}
  width: 100%;
  height: fit-content;

  padding: 3px 0px 2px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_02_2};
`;