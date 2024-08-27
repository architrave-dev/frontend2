import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import ProjectInfo from '../../component/projectDetail/ProjectInfo';
import { useProjectDetail } from '../../shared/hooks/useProjectDetail';
import ProjectInfoFlex from './ProjectInfoFlex';
import { useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import ProjectInfoTemp from './ProjectInfoTemp';
import { CreateProjectInfoReq } from '../../shared/api/projectApi';

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
  const { createInfoList, setCreateInfoList, updateInfoList, removeInfoList } = useProjectInfoListStoreForUpdate();

  const handleCreateInfo = () => {
    const newInfo: CreateProjectInfoReq = {
      tempId: Math.floor(Math.random() * 100) + "",
      customName: 'New Info',
      customValue: 'New value'
    };
    setCreateInfoList([...createInfoList, newInfo]);
  };

  useEffect(() => {
    console.log("================================= start");
    console.log("projectInfoList: ", projectInfoList);
    console.log("createInfoList: ", createInfoList);
    console.log("updateInfoList: ", updateInfoList);
    console.log("removeInfoList: ", removeInfoList);
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end");

  }, [projectInfoList, createInfoList, updateInfoList, removeInfoList]);


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
          <ProjectInfo
            initialCustomName="Date"
            initialCustomValue={date}
            changeValue={setDate}
            isEditMode={isEditMode}
          />
          <ProjectInfo
            initialCustomName="Support"
            initialCustomValue={supportedBy}
            changeValue={setSupportedBy}
            isEditMode={isEditMode}
          />
          {createInfoList.map((each) => (
            <ProjectInfoTemp
              key={each.tempId}
              tempId={each.tempId}
              initialCustomName={each.customName}
              initialCustomValue={each.customValue}
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