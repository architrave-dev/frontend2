import React, { useState } from 'react';
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
  margin-bottom: 10px;
`;

const NameInput = styled.input`
  width: 12vw;
  margin-right: 20px;
  padding: 5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const ValueInput = styled.input`
  width: 50vw;  
  padding: 5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;


const NameSection = styled.div`
  width: 18vw;
  padding: 5px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const ValueSection = styled.div`
  width: 60vw;
  padding: 5px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default ProjectInfo;
