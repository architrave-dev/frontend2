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
    isEditMode ? (
      <ProjectInfoItem>
        <strong>
          <InfoInput
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
          :
        </strong>
        <InfoInput
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
        />
      </ProjectInfoItem >
    ) : (
      <ProjectInfoItem>
        <strong>{customName}:</strong> {customValue}
      </ProjectInfoItem>
    )
  );
}

const ProjectInfoItem = styled.li`
  margin-bottom: 10px;
`;

const InfoInput = styled.input`
  margin-left: 5px;
  padding: 5px;
`;


export default ProjectInfo;
