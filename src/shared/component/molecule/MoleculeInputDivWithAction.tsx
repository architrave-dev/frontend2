import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import { StyledDivComponent, StyledInputComponent } from '../../dto/StyleCompRepository';
import HeadlessInput from '../headless/input/HeadlessInput';
import Arrow from '../Arrow';
import { styled } from 'styled-components';

interface MoleculeInputDivProps {
  value: string | number;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputStyle: StyledInputComponent;
  StyledDiv: StyledDivComponent;
  onClick: () => void;
}

const MoleculeInputDiv: React.FC<MoleculeInputDivProps> = ({
  value,
  placeholder,
  handleChange,
  inputStyle,
  StyledDiv,
  onClick,
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
        <StyledDiv>
          <div>
            {value}
          </div>
          {value &&
            <ArrowWrapper onClick={onClick}>
              <Arrow />
            </ArrowWrapper>
          }
        </StyledDiv>
      )}
    </>
  );
};


export default MoleculeInputDiv;

const ArrowWrapper = styled.div`
  height: 100%;
  cursor: pointer;
`;