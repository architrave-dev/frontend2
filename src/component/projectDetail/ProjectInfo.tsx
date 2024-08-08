import React, { useState } from 'react';
import styled from 'styled-components';

interface ProjectInfoProps {
  initialCustomName: string;
  initialCustomValue: string;
  isEditMode: boolean;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ initialCustomName, initialCustomValue, isEditMode }) => {
  const [customName, setCustomName] = useState(initialCustomName);
  const [customValue, setCustomValue] = useState(initialCustomValue);


  return (
    <ProjectInfoItem>
      {isEditMode ? (
        <>
          <NameInput
            value={customName}
            onChange={(e) => setCustomName(e.target.value)} />
          <ValueInput
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)} />
        </>
      ) : (
        <>
          <NameSection>{customName}</NameSection>
          <ValueSection>{customValue}</ValueSection>
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
  font-size: ${({ theme }) => theme.fontSize.font_B02};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const ValueInput = styled.input`
  width: 50vw;  
  padding: 5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  font-size: ${({ theme }) => theme.fontSize.font_B02};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;


const NameSection = styled.div`
  width: 18vw;
  padding: 5px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B02};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const ValueSection = styled.div`
  width: 60vw;
  padding: 5px;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  font-size: ${({ theme }) => theme.fontSize.font_B02};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default ProjectInfo;
