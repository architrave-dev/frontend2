import React from 'react';
import styled from 'styled-components';


export type CreateButtonProps = {
  name: string;
  handleCreate: () => void;
  wide?: boolean;
};

const CreateButton: React.FC<CreateButtonProps> = ({ name, handleCreate, wide = false }) => {
  return (
    <CreateBtn onClick={handleCreate} $wide={wide}>
      {name}
    </CreateBtn>
  );
}

const CreateBtn = styled.button<{ $wide: boolean }>`
  width: ${props => props.$wide ? "50vw" : ""};
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.color_White};
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
`;

export default CreateButton;