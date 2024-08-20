import React, { useState } from 'react';
import styled from 'styled-components';
import { useProjectInfoListStore } from '../../shared/store/projectInfoListStore';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { RemoveProjectInfoReq } from '../../shared/api/projectApi';

interface ProjectInfoProps {
  projectInfoId: string;
  initialCustomName: string;
  initialCustomValue: string;
}

const ProjectInfoFlex: React.FC<ProjectInfoProps> = ({
  projectInfoId,
  initialCustomName,
  initialCustomValue }) => {
  const { isEditMode } = useEditMode();
  const { projectInfoList, setProjectInfoList, removeInfoList, setRemoveInfoList } = useProjectInfoListStore();
  const [isDeleted, setIsDeleted] = useState(false);
  const handlechangeName = (value: string) => {
    const updatedProjectInfoList = projectInfoList.map(each =>
      each.id === projectInfoId ? { ...each, customName: value } : each
    );
    setProjectInfoList(updatedProjectInfoList);
  }

  const handlechangeValue = (value: string) => {
    const updatedProjectInfoList = projectInfoList.map(each =>
      each.id === projectInfoId ? { ...each, customValue: value } : each
    );
    setProjectInfoList(updatedProjectInfoList);
  }

  const handleDelete = () => {
    setIsDeleted(true);
    const newRemoveInfo: RemoveProjectInfoReq = { id: projectInfoId };
    setRemoveInfoList([...removeInfoList, newRemoveInfo]);
  }

  return (
    <ProjectInfoItem $isDeleted={isDeleted}>
      {isEditMode ? (
        <>
          <NameInput
            value={initialCustomName}
            onChange={(e) => handlechangeName(e.target.value)}
          />
          <ValueInput
            value={initialCustomValue}
            onChange={(e) => handlechangeValue(e.target.value)}
          />
          <DeleteButton onClick={handleDelete} disabled={isDeleted}>
            Delete
          </DeleteButton>
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

const ProjectInfoItem = styled.div<{ $isDeleted: boolean }>`
  display: flex;
  margin-bottom: 10px;
  opacity: ${({ $isDeleted }) => $isDeleted ? 0.3 : 1};
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

const DeleteButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #ff9999;
    cursor: not-allowed;
  }
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

export default ProjectInfoFlex;
