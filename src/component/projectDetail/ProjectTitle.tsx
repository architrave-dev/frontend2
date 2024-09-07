import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { InputTitle } from '../../shared/component/headless/input/InputBody';

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
        <HeadlessInput
          type={'text'}
          value={title ? title : ''}
          handleChange={handleTitleChange}
          placeholder={"Enter title"}
          StyledInput={InputTitle}
        />
      ) : (
        <TitleDisplay>{title}</TitleDisplay>
      )}
    </>
  );
}

const TitleDisplay = styled.h1`
  padding: 5px;
  margin-bottom: calc(2vh);
  ${({ theme }) => theme.typography.H_015};
`;

export default ProjectTitle;