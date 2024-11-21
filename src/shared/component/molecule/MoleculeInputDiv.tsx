import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import { StyledDivComponent, StyledInputComponent } from '../../dto/StyleCompRepository';
import HeadlessInput from '../headless/input/HeadlessInput';

interface MoleculeInputDivProps {
  value: string | number;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputStyle: StyledInputComponent;
  StyledDiv: StyledDivComponent;
}

const MoleculeInputDiv: React.FC<MoleculeInputDivProps> = ({
  value,
  placeholder,
  handleChange,
  inputStyle,
  StyledDiv,
}) => {
  const { isEditMode } = useEditMode();

  return (
    <>
      {isEditMode ? (
        <HeadlessInput
          type={'text'}
          value={value}
          handleChange={handleChange}
          placeholder={"Enter " + placeholder}
          StyledInput={inputStyle}
        />
      ) : (
        <StyledDiv>{value}</StyledDiv>
      )}
    </>
  );
};


export default MoleculeInputDiv;
