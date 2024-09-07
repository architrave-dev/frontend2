import React from 'react';

type StyledBtnComponent = React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;


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