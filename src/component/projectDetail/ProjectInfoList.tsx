import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectDetail } from '../../shared/hooks/useProjectDetail';
import ProjectInfo from './ProjectInfo';
import { useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import ProjectInfoTemp from './ProjectInfoTemp';
import { CreateProjectInfoReq } from '../../shared/api/projectApi';
import Space from '../../shared/Space';

const ProjectInfoList: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { isLoading } = useProjectDetail();
  const { projectInfoList } = useProjectInfoListStore();
  const { createInfoList, setCreateInfoList } = useProjectInfoListStoreForUpdate();

  const handleCreateInfo = () => {
    const newInfo: CreateProjectInfoReq = {
      tempId: Math.floor(Math.random() * 100) + "",
      customName: '',
      customValue: ''
    };
    setCreateInfoList([...createInfoList, newInfo]);
  };


  return (
    <ProjectInfoListComp>
      {projectInfoList && projectInfoList.map((each, index) =>
        <ProjectInfo
          key={index}
          projectInfoId={each.id}
          initialCustomName={each.customName}
          initialCustomValue={each.customValue}
        />
      )}
      {isEditMode &&
        <>
          {createInfoList.map((each) => (
            <ProjectInfoTemp
              key={each.tempId}
              tempId={each.tempId}
              initialCustomName={each.customName}
              initialCustomValue={each.customValue}
            />
          ))}
        </>
      }
      <Space $align={"center"} $height={"calc(6vw)"}>
        {isEditMode &&
          <CreateButton onClick={handleCreateInfo}>
            Create ProjectInfo
          </CreateButton>
        }
      </Space>
    </ProjectInfoListComp>
  );
}

const ProjectInfoListComp = styled.article`
`;

const CreateButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.color_White};
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
`;

export default ProjectInfoList;