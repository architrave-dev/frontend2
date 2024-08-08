import React, { useState } from 'react';
import styled from 'styled-components';

interface ProjectTitleProps {
  initialTitle: string;
  isEditMode: boolean;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ initialTitle, isEditMode }) => {
  const [title, setTitle] = useState(initialTitle);

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
  margin-bottom: 20px;
  padding: 5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
  font-size: ${({ theme }) => theme.fontSize.font_H015};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const TitleDisplay = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.font_H015};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 20px;
`;

export default ProjectTitle;