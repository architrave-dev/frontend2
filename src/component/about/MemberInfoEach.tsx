import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { MemberInfoValue } from '../../shared/component/headless/input/InputBody';



export interface MemberInfoEachProps {
  name: string;
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MemberInfoEach: React.FC<MemberInfoEachProps> = ({
  name, value, handleChange
}) => {

  const { isEditMode } = useEditMode();

  return (
    <Info>
      <NameSection>{name}</NameSection>
      {isEditMode ?
        <HeadlessInput
          value={value ? value : ''}
          placeholder={"Enter value"}
          handleChange={handleChange}
          StyledInput={MemberInfoValue}
        /> :
        <ValueSection>{value ? value : "Fill this feild"}</ValueSection>
      }
    </Info>
  );
};

const Info = styled.div`
  display: flex;
`;

const NameSection = styled.div`
  width: 120px;
  padding: 5px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_02_2};
`;

const ValueSection = styled.div`
  width: 100%;
  padding: 5px 0;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_02_1};
`;


export default MemberInfoEach;
