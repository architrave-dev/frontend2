import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import { StyledAnchorComponent, StyledInputComponent } from '../../dto/StyleCompRepository';
import HeadlessInput from '../headless/input/HeadlessInput';
import Arrow from '../Arrow';
import styled from 'styled-components';
import { OrgWrapper, VisibileGrab } from '../organism/OrgDescription';

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

  const changeVisible = () => {
    console.log('changeVisible');
  }

  return (
    <>
      {isEditMode ? (
        <OrgWrapper $isVisible={true}>
          <HeadlessInput
            type={'text'}
            value={value || ''}
            handleChange={handleChange}
            placeholder={"Enter " + placeholder}
            StyledInput={inputStyle}
          />
          <VisibileGrab
            onDoubleClick={changeVisible}
          >.:</VisibileGrab>
        </OrgWrapper>
      ) : (
        value ?
          <StyledAnchor href={value} target="_blank" rel="noopener noreferrer">
            {value}
            <Arrow />
          </StyledAnchor>
          :
          <DefaultDiv>{defaultValue}</DefaultDiv>
      )}
    </>
  );
};

const DefaultDiv = styled.div`
  width: fit-content;
  height: 20px;
  color: ${({ theme }) => theme.colors.color_Gray_04} !important;
  ${({ theme }) => theme.typography.Body_03_2};

  background-color: beige;
`;

export default MoleculeInputAnchor;
