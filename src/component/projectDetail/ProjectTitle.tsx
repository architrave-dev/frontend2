import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { InputTitle } from '../../shared/component/headless/input/InputBody';

interface ProjectTitleProps {
  title: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ title, handleChange }) => {
  const { isEditMode } = useEditMode();


  return (
    <>
      {isEditMode ? (
        <HeadlessInput
          type={'text'}
          value={title ? title : ''}
          handleChange={handleChange}
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