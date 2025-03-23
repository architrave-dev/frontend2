import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import { StyledDivComponent, StyledInputComponent } from '../../dto/StyleCompRepository';
import { OrgWrapper, VisibileGrab } from './OrgDescription';
import HeadlessInput from '../headless/input/HeadlessInput';
import { styled } from 'styled-components';


interface OrgInputDivVisiProps {
  value: string | number;
  defaultValue: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputStyle: StyledInputComponent;
  StyledDiv: StyledDivComponent;
  visible: boolean;
  changeVisible: () => void;
}

const OrgInputDivVisi: React.FC<OrgInputDivVisiProps> = ({
  value,
  defaultValue,
  placeholder,
  handleChange,
  inputStyle,
  StyledDiv,
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
            value={value}
            handleChange={handleChange}
            placeholder={placeholder}
            StyledInput={inputStyle}
          />
          <VisibileGrab
            onDoubleClick={changeVisible}
          >.:</VisibileGrab>
        </OrgWrapper>
      ) : (
        visible ? (
          value ? (
            <StyledDiv>{value}</StyledDiv>
          ) : (
            <DefaultDiv>{defaultValue}</DefaultDiv>
          )
        ) : null
      )}
    </>
  );
};

const DefaultDiv = styled.div`
  width: 100%;
  height: 20px;
  color: ${({ theme }) => theme.colors.color_Gray_04} !important;
  ${({ theme }) => theme.typography.Body_03_2};

  background-color: ${({ theme }) => theme.colors.color_Gray_06};
`;

export default OrgInputDivVisi;
