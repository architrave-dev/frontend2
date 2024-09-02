import React from 'react';
import styled from 'styled-components';

export type DeleteButtonProps = {
  handleDelete: () => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ handleDelete }) => {
  return (
    <DeleteBtn onClick={handleDelete}>
      Delete
    </DeleteBtn>
  );
}


const DeleteBtn = styled.button`
  height: 32px;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.color_Gray_02};
  color: ${({ theme }) => theme.colors.color_White};
  cursor: pointer;
`;

export default DeleteButton;
