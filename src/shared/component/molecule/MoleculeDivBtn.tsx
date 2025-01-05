import React from 'react';
import { styled } from 'styled-components';
import { useEditMode } from '../../hooks/useEditMode';
import { StyledBtnComponent, StyledDivComponent, StyledInputComponent } from '../../dto/StyleCompRepository';
import HeadlessBtn from '../headless/button/HeadlessBtn';

interface MoleculeDivBtnProps {
  value: string;
  defaultValue: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  DivChangeStyle: StyledDivComponent;
  DivStyle: StyledDivComponent;
  StyledBtn: StyledBtnComponent;
}

const MoleculeDivBtn: React.FC<MoleculeDivBtnProps> = ({
  value,
  defaultValue,
  handleClick,
  DivChangeStyle,
  DivStyle,
  StyledBtn,
}) => {
  const { isEditMode } = useEditMode();

  return (
    <MoleculeDivBtnWrapper>
      {isEditMode ?
        <>
          <DivChangeStyle> {!value ? defaultValue : value} </DivChangeStyle>
          <HeadlessBtn
            value={"Change"}
            handleClick={handleClick}
            StyledBtn={StyledBtn}
          />
        </>
        :
        <DivStyle>{!value ? defaultValue : value}</DivStyle>
      }
    </MoleculeDivBtnWrapper>
  );
};


export default MoleculeDivBtn;


export const MoleculeDivBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;