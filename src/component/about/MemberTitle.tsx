import React from 'react';
import styled from 'styled-components';
import { MemberTitleInput } from '../../shared/component/headless/input/InputBody';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';


export interface MemberTitleProps {
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MemberTitle: React.FC<MemberTitleProps> = ({
  value, handleChange
}) => {

  return (
    <Info>
      <MoleculeInputDiv
        value={value}
        placeholder={"Name"}
        handleChange={handleChange}
        inputStyle={MemberTitleInput}
        StyledDiv={ValueSection}
      />
    </Info>
  );
};

const Info = styled.div`
  display: flex;
  margin-bottom: 14px;
`;

const ValueSection = styled.div`
  width: 100%;
  padding: 5px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.H_03};
`;


export default MemberTitle;
