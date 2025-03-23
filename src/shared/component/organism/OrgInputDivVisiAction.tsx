import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import { StyledDivComponent, StyledInputComponent } from '../../dto/StyleCompRepository';
import HeadlessInput from '../headless/input/HeadlessInput';
import Arrow from '../Arrow';
import { styled } from 'styled-components';
import { OrgWrapper, VisibileGrab } from './OrgDescription';


interface OrgInputDivVisiActionProps {
  value: string | number;
  defaultValue: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputStyle: StyledInputComponent;
  StyledDiv: StyledDivComponent;
  visible: boolean;
  changeVisible: () => void;
  onClick: () => void;
}

const OrgInputDivVisiAction: React.FC<OrgInputDivVisiActionProps> = ({
  value,
  defaultValue,
  placeholder,
  handleChange,
  inputStyle,
  StyledDiv,
  visible,
  changeVisible,
  onClick,
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
            placeholder={"Enter " + placeholder}
            StyledInput={inputStyle}
          />
          <VisibileGrab
            onDoubleClick={changeVisible}
          >.:</VisibileGrab>
        </OrgWrapper >
      ) : (
        visible ? (
          value ? (
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
          ) : (
            <DefaultDiv>
              {defaultValue}
            </DefaultDiv>
          )
        ) : null
      )}
    </>
  );
};


export default OrgInputDivVisiAction;

export const DefaultDiv = styled.div`
  width: 100%;
  height: 20px;
  color: ${({ theme }) => theme.colors.color_Gray_04} !important;
  ${({ theme }) => theme.typography.Body_03_2};

  background-color: ${({ theme }) => theme.colors.color_Gray_06};
`;

const ArrowWrapper = styled.div`
  height: 100%;
  cursor: pointer;
`;