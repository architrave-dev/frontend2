import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useProjectInfoListStore } from '../../shared/store/projectInfoListStore';
import { useEditMode } from '../../shared/hooks/useEditMode';

interface ProjectInfoTempProps {
  index: number;
  initialCustomName: string;
  initialCustomValue: string;
}

const ProjectInfoTemp: React.FC<ProjectInfoTempProps> = ({
  initialCustomName,
  initialCustomValue,
  index
}) => {
  const { createInfoList, setCreateInfoList } = useProjectInfoListStore();

  const [customName, setCustomName] = useState(initialCustomName);
  const [customValue, setCustomValue] = useState(initialCustomValue);

  const updateCreateInfoList = (name: string, value: string) => {
    const updatedCreateInfoList = createInfoList.map((item, idx) => {
      if (idx === index) {
        return { customName: name, customValue: value };
      } else {
        return item;
      }
    });
    setCreateInfoList(updatedCreateInfoList);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setCustomName(newName);
    updateCreateInfoList(newName, customValue);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomValue(newValue);
    updateCreateInfoList(customName, newValue);
  };

  const handleDelete = () => {
    const filteredList = createInfoList.filter((_, idx) => idx !== index);
    setCreateInfoList(filteredList);
  };

  return (
    <ProjectInfoItem>
      <NameInput
        value={customName}
        onChange={handleNameChange}
        placeholder="Enter name"
      />
      <ValueInput
        value={customValue}
        onChange={handleValueChange}
        placeholder="Enter value"
      />
      <DeleteButton onClick={handleDelete}>
        Delete
      </DeleteButton>
    </ProjectInfoItem>
  );
};

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
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_alert_green};
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
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_alert_green};
  outline: none;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const DeleteButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff3333;
  }
`;

export default ProjectInfoTemp;