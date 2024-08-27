import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { CreateProjectInfoReq } from '../../shared/api/projectApi';

interface ProjectInfoTempProps {
  tempId: string;
  initialCustomName: string;
  initialCustomValue: string;
}

const ProjectInfoTemp: React.FC<ProjectInfoTempProps> = ({
  tempId,
  initialCustomName,
  initialCustomValue
}) => {
  const { createInfoList, setCreateInfoList } = useProjectInfoListStoreForUpdate();


  const handlechange = (field: keyof CreateProjectInfoReq, value: string) => {
    const newCreateInfoList: CreateProjectInfoReq[] = createInfoList.map(each =>
      each.tempId === tempId ? { ...each, [field]: value } : each
    )
    setCreateInfoList(newCreateInfoList);
  }

  const handleDelete = () => {
    const filteredList = createInfoList.filter((each) => each.tempId !== tempId);
    setCreateInfoList(filteredList);
  };

  return (
    <ProjectInfoItem>
      <NameInput
        value={initialCustomName}
        onChange={(e) => handlechange("customName", e.target.value)}
        placeholder="Enter name"
      />
      <ValueInput
        value={initialCustomValue}
        onChange={(e) => handlechange("customValue", e.target.value)}
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