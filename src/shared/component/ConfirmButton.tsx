import React from 'react';
import styled from 'styled-components';

export type ConfirmButtonProps = {
  handleConfirm: () => void;
};

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ handleConfirm }) => {
  return (
    <ConfirmBtn onClick={handleConfirm}>Confirm</ConfirmBtn>
  );
};

const ConfirmBtn = styled.button`
  position: absolute;
  bottom: calc(8vh);
  right: calc(10vw);
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.color_Alpha_04};
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
`;


export default ConfirmButton;
