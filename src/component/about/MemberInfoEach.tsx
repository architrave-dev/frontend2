import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { InputWorkName } from '../../shared/component/headless/input/InputBody';



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
      <NameSection>{name}:</NameSection>
      {isEditMode ?
        <HeadlessInput
          value={value.toString()}
          placeholder={"Enter value"}
          handleChange={handleChange}
          StyledInput={InputWorkName}
        /> :
        <ValueSection>{value}</ValueSection>
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
  ${({ theme }) => theme.typography.Body_03_2};

  background-color: #ff7251;
`;

const ValueSection = styled.div`
  width: 100%;
  padding: 5px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_1};
`;


export default MemberInfoEach;
