import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import ProjectInfo from '../../component/projectDetail/ProjectInfo';
import { useProjectDetail } from '../../shared/hooks/useProjectDetail';
import ProjectInfoFlex from './ProjectInfoFlex';
import { useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import ProjectInfoTemp from './ProjectInfoTemp';
import { CreateProjectInfoReq } from '../../shared/api/projectApi';
import Space from '../../shared/Space';

interface ProjectInfoListProps {
  date: string;
  setDate: (value: string) => void;
  supportedBy: string;
  setSupportedBy: (value: string) => void;
}

const ProjectInfoList: React.FC<ProjectInfoListProps> = (
  { date, setDate, supportedBy, setSupportedBy }
) => {
  const { isEditMode } = useEditMode();
  const { isLoading, project } = useProjectDetail();
  const { projectInfoList } = useProjectInfoListStore();
  const { createInfoList, setCreateInfoList } = useProjectInfoListStoreForUpdate();

  const handleCreateInfo = () => {
    const newInfo: CreateProjectInfoReq = {
      tempId: Math.floor(Math.random() * 100) + "",
      customName: 'New Info',
      customValue: 'New value'
    };
    setCreateInfoList([...createInfoList, newInfo]);
  };


  return (
    <ProjectInfoListComp>
      {project?.startDate && project?.endDate &&
        <ProjectInfo
          initialCustomName="Date"
          initialCustomValue={date}
          changeValue={setDate}
          isEditMode={isEditMode}
        />
      }
      {project?.supportedBy &&
        <ProjectInfo
          initialCustomName="Support"
          initialCustomValue={supportedBy}
          changeValue={setSupportedBy}
          isEditMode={isEditMode}
        />
      }
      {projectInfoList && projectInfoList.map((each, index) => (
        <ProjectInfoFlex
          key={index}
          projectInfoId={each.id}
          initialCustomName={each.customName}
          initialCustomValue={each.customValue}
        />
      ))}
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

  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
`;

export default ProjectInfoList;