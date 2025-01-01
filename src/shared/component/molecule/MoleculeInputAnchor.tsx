import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import { StyledAnchorComponent, StyledInputComponent } from '../../dto/StyleCompRepository';
import HeadlessInput from '../headless/input/HeadlessInput';
import Arrow from '../Arrow';

interface MoleculeInputAnchorProps {
  value: string;
  defaultValue: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputStyle: StyledInputComponent;
  StyledAnchor: StyledAnchorComponent;
}

const MoleculeInputAnchor: React.FC<MoleculeInputAnchorProps> = ({
  value,
  defaultValue,
  placeholder,
  handleChange,
  inputStyle,
  StyledAnchor,
}) => {
  const { isEditMode } = useEditMode();

  if (!isEditMode && !value) {
    return null;
  }

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
        <StyledAnchor href={value} target="_blank" rel="noopener noreferrer">
          {defaultValue}
          <Arrow />
        </StyledAnchor>
      )}
    </>
  );
};


export default MoleculeInputAnchor;
