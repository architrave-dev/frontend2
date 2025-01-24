import React from 'react';
import { StyledBtnComponent } from '../../../dto/StyleCompRepository';
import styled from 'styled-components';

interface HeadlessBtnProps {
  icon: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  StyledBtn: StyledBtnComponent
};

const HeadlessBtn: React.FC<HeadlessBtnProps> = ({
  icon,
  handleClick,
  StyledBtn
}) => {
  return (
    <StyledBtn onClick={handleClick}>
      <Icon src={icon} alt='icon' />
    </StyledBtn>
  );
}

export default HeadlessBtn;

const Icon = styled.img`
  width: 1.2vw;
  height: 1.2vw;
`;