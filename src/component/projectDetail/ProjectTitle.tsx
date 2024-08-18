import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectDetail } from '../../shared/hooks/useProjectDetail';



const ProjectTitle: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { isLoading, project } = useProjectDetail();
  const [title, setTitle] = useState(project?.title);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
    }
  }, [project]);

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
  margin-bottom: calc(2vh);
  padding: 5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
  font-size: ${({ theme }) => theme.fontSize.font_H015};
  font-weight: ${({ theme }) => theme.fontWeight.semi_bold};
`;

const TitleDisplay = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.font_H015};
  font-weight: ${({ theme }) => theme.fontWeight.semi_bold};
  margin-bottom: calc(2vh);
`;

export default ProjectTitle;