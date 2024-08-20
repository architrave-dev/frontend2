import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import ProjectInfo from '../../component/projectDetail/ProjectInfo';
import { useProjectDetail } from '../../shared/hooks/useProjectDetail';
import ProjectInfoFlex from './ProjectInfoFlex';
import { useProjectInfoListStore } from '../../shared/store/projectInfoListStore';
import ProjectInfoTemp from './ProjectInfoTemp';

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
  const { projectInfoList, setProjectInfoList, createInfoList, setCreateInfoList } = useProjectInfoListStore();

  useEffect(() => {
    if (project) {
      setProjectInfoList(project.projectInfoList);
    }
  }, [project]);

  const handleCreateInfo = () => {
    const newInfo = {
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

      {isEditMode && (
        <>
          {createInfoList.map((newInfo, index) => (
            <ProjectInfoTemp
              key={`new-${index}`}
              initialCustomName={newInfo.customName}
              initialCustomValue={newInfo.customValue}
              index={index}
            />
          ))}
          <CreateButton onClick={handleCreateInfo}>
            Create ProjectInfo
          </CreateButton>
        </>
      )}
    </ProjectInfoListComp>
  );
}

const ProjectInfoListComp = styled.article`
  margin-bottom: calc(6vw);
`;
const CreateButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export default ProjectInfoList;