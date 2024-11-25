import React from 'react';
import styled from 'styled-components';
import { MemberInfoValue } from '../../shared/component/headless/input/InputBody';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';



export interface MemberInfoEachProps {
  name: string;
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MemberInfoEach: React.FC<MemberInfoEachProps> = ({
  name, value, handleChange
}) => {

  return (
    <Info>
      <NameSection>{name}</NameSection>
      <MoleculeInputDiv
        value={value}
        placeholder={"value"}
        handleChange={handleChange}
        inputStyle={MemberInfoValue}
        StyledDiv={ValueSection}
      />
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
