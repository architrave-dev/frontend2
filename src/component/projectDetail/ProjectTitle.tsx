import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';

interface ProjectTitleProps {
  title: string;
  setTitle: (value: string) => void;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ title, setTitle }) => {
  const { isEditMode } = useEditMode();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      {isEditMode ? (
        <TitleInput
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter title"
        />
      ) : (
        <TitleDisplay>{title}</TitleDisplay>
      )}
    </>
  );

}

const TitleInput = styled.input`
  width: 100%;
  margin-bottom: calc(2vh - 2px);
  padding: 5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_06};
  outline: none;
  font-size: ${({ theme }) => theme.fontSize.font_H015};
  font-weight: ${({ theme }) => theme.fontWeight.semi_bold};
`;

const TitleDisplay = styled.h1`
  padding: 5px;
  font-size: ${({ theme }) => theme.fontSize.font_H015};
  font-weight: ${({ theme }) => theme.fontWeight.semi_bold};
  margin-bottom: calc(2vh);
`;

export default ProjectTitle;