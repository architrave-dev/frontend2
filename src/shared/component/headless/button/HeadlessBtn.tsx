import React from 'react';
import { StyledBtnComponent } from '../../../dto/StyleCompRepository';

interface HeadlessBtnProps {
  value: string;
  loadingValue?: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  StyledBtn: StyledBtnComponent
};

const HeadlessBtn: React.FC<HeadlessBtnProps> = ({
  value,
  loadingValue,
  handleClick,
  StyledBtn
}) => {
  return (
    <StyledBtn onClick={handleClick}>
      {value}
    </StyledBtn>
  );
}

export default HeadlessBtn;