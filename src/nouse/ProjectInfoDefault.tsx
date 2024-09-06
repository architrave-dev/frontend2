import React from 'react';
import styled from 'styled-components';

interface ProjectInfoProps {
  initialCustomName: string;
  initialCustomValue: string;
  changeValue: (value: string) => void | null;
  isEditMode: boolean;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({
  initialCustomName,
  initialCustomValue,
  changeValue,
  isEditMode }) => {

  return (
    <ProjectInfoItem>
      {isEditMode ? (
        <>
          <NameInput
            value={initialCustomName}
            onChange={(e) => changeValue(e.target.value)} />
          <ValueInput
            value={initialCustomValue}
            onChange={(e) => changeValue(e.target.value)} />
        </>
      ) : (
        <>
          <NameSection>{initialCustomName}</NameSection>
          <ValueSection>{initialCustomValue}</ValueSection>
        </>
      )}
    </ProjectInfoItem>
  );
}

const ProjectInfoItem = styled.div`
  display: flex;
`;

const NameInput = styled.input`
  width: 18vw;
  margin-right: 20px;
  margin-bottom: 8px;
  padding: 5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_06};
  outline: none;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_03_2};
`;

const ValueInput = styled.input`
  width: 50vw; 
  margin-bottom: 8px; 
  padding: 5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_06};
  outline: none;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_1};
`;


const NameSection = styled.div`
  width: 18vw;
  padding: 5px;
  margin-right: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_03_2};
`;

const ValueSection = styled.div`
  width: 60vw;
  padding: 5px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_1};
`;

export default ProjectInfo;
