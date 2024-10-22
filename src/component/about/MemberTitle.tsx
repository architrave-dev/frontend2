import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { MemberTitleInput } from '../../shared/component/headless/input/InputBody';



export interface MemberTitleProps {
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MemberTitle: React.FC<MemberTitleProps> = ({
  value, handleChange
}) => {

  const { isEditMode } = useEditMode();
  return (
    <Info>
      {isEditMode ?
        <HeadlessInput
          value={value}
          placeholder={"Enter value"}
          handleChange={handleChange}
          StyledInput={MemberTitleInput}
        /> :
        <ValueSection>{value ? value : "Name"}</ValueSection>
      }
    </Info>
  );
};

const Info = styled.div`
  display: flex;
  margin-bottom: 18px;
`;

const ValueSection = styled.div`
  width: 100%;
  padding: 5px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.H_02};
`;


export default MemberTitle;
