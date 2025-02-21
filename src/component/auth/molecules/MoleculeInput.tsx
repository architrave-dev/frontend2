import React from 'react';
import styled from 'styled-components';
import HeadlessInput from '../../../shared/component/headless/input/HeadlessInput';
import { InputAuth } from '../../../shared/component/headless/input/InputBody';


interface MoleculeInputProps {
  name: string;
  validate: () => void;
  value: string;
  handleChange: (value: string) => void;
  err: string | null;
  placeholder: string;
}

const MoleculeInput: React.FC<MoleculeInputProps> = ({
  name,
  validate,
  value,
  handleChange,
  err,
  placeholder
}) => {

  return (
    <>
      <InputName>{name}</InputName>
      <InputWrapper onBlur={validate}>
        <HeadlessInput
          type={name === 'Password' ? 'password' : 'text'}
          value={value}
          handleChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          StyledInput={InputAuth}
        />
      </InputWrapper>
      {err !== null && <ErrorText>{err}</ErrorText>}
    </>
  );
};


const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  margin-bottom: 4px;
`;

const InputName = styled.h3`
  display: block;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_02_1};
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.color_alert_red};
  margin-bottom: 10px;
  min-height: 18px; // Ensures consistent height even when empty
  ${({ theme }) => theme.typography.Body_04};
`;



export default MoleculeInput;