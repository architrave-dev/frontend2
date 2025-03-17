import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import { StyledDivComponent, StyledInputComponent } from '../../dto/StyleCompRepository';
import { useWorkPropertyVisible } from '../../hooks/useApi/useWorkPropertyVisible';
import { OrgWrapper, VisibileGrab } from './OrgDescription';
import HeadlessInput from '../headless/input/HeadlessInput';


interface OrgInputDivVisiProps {
  value: string | number;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputStyle: StyledInputComponent;
  StyledDiv: StyledDivComponent;
  visible: boolean;
  changeVisible: () => void;
}

const OrgInputDivVisi: React.FC<OrgInputDivVisiProps> = ({
  value,
  placeholder,
  handleChange,
  inputStyle,
  StyledDiv,
  visible,
  changeVisible,
}) => {
  const { isEditMode } = useEditMode();
  const { workPropertyVisible } = useWorkPropertyVisible();

  if (!workPropertyVisible) return null;


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
        </OrgWrapper>
      ) : (
        visible ?
          <StyledDiv>{value}</StyledDiv>
          :
          null
      )}
    </>
  );
};


export default OrgInputDivVisi;
