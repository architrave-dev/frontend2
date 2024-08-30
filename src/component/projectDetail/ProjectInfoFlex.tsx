import React, { useState } from 'react';
import styled from 'styled-components';
import { ProjectInfoData, useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { RemoveProjectInfoReq, UpdatedProjectInfoReq } from '../../shared/api/projectApi';

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
  const { projectInfoList, setProjectInfoList } = useProjectInfoListStore();
  const { updateInfoList, setUpdateInfoList, removeInfoList, setRemoveInfoList } = useProjectInfoListStoreForUpdate();
  const [isDeleted, setIsDeleted] = useState(false);


  const handlechange = (field: keyof UpdatedProjectInfoReq, value: string) => {

    const targetElement = updateInfoList.find(info => info.id === projectInfoId);
    if (targetElement) {
      //updateInfoList에 있다면
      const updatedProjectInfoList = updateInfoList.map(each =>
        each.id === projectInfoId ? { ...each, [field]: value } : each
      )
      setUpdateInfoList(updatedProjectInfoList);
    } else {
      //updateInfoList에 없다면
      const target = projectInfoList.find(info => info.id === projectInfoId);
      if (!target) return;

      const newUpdatedProjectInfoReq: UpdatedProjectInfoReq = {
        ...target,
        [field]: value
      };
      setUpdateInfoList([...updateInfoList, newUpdatedProjectInfoReq]);
    }
    const updatedProjectInfoList: ProjectInfoData[] = projectInfoList.map(each =>
      each.id === projectInfoId ? { ...each, [field]: value } : each
    )
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
            placeholder='Enter info'
            onChange={(e) => handlechange("customName", e.target.value)}
          />
          <ValueInput
            value={initialCustomValue}
            placeholder='Enter value'
            onChange={(e) => handlechange("customValue", e.target.value)}
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
  height: 40px;
  opacity: ${({ $isDeleted }) => $isDeleted ? 0.3 : 1};
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
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
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
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const DeleteButton = styled.button`
  margin-bottom: 8px;
  margin-left: 24px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.color_Gray_02};
  color: ${({ theme }) => theme.colors.color_White};
  cursor: pointer;
  &:disabled {
    background-color: ${({ theme }) => theme.colors.color_Gray_04};
    cursor: not-allowed;
  }
`;

const NameSection = styled.div`
  width: 18vw;
  padding: 5px;
  margin-right: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const ValueSection = styled.div`
  width: 60vw;
  padding: 5px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default ProjectInfoFlex;
