import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import { StyledAnchorComponent, StyledInputComponent } from '../../dto/StyleCompRepository';
import HeadlessInput from '../headless/input/HeadlessInput';
import Arrow from '../Arrow';
import styled from 'styled-components';
import { OrgWrapper, VisibileGrab } from './OrgDescription';


interface OrgInputAnchorVisiProps {
  value: string;
  defaultValue: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputStyle: StyledInputComponent;
  StyledAnchor: StyledAnchorComponent;
  visible: boolean;
  changeVisible: () => void;
}

const OrgInputAnchorVisi: React.FC<OrgInputAnchorVisiProps> = ({
  value,
  defaultValue,
  placeholder,
  handleChange,
  inputStyle,
  StyledAnchor,
  visible,
  changeVisible,
}) => {
  const { isEditMode } = useEditMode();

  return (
    <>
      {isEditMode ? (
        <OrgWrapper $isVisible={visible}>
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
        visible ? (
          value ?
            <StyledAnchor href={value} target="_blank" rel="noopener noreferrer">
              {value}
              <Arrow />
            </StyledAnchor>
            :
            <DefaultDiv>{defaultValue}</DefaultDiv>
        ) : null
      )}
    </>
  );
};

const DefaultDiv = styled.div`
  width: fit-content;
  height: 20px;
  color: ${({ theme }) => theme.colors.color_Gray_04} !important;
  ${({ theme }) => theme.typography.Body_03_2};

  background-color: ${({ theme }) => theme.colors.color_Gray_06};
`;

export default OrgInputAnchorVisi;
