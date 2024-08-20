import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectTitle from '../../component/projectDetail/ProjectTitle';
import Divider, { DividerType } from '../../shared/Divider';
import ProjectInfoList from '../../component/projectDetail/ProjectInfoList';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectDetail } from '../../shared/hooks/useProjectDetail';
import { UpdateProjectReq } from '../../shared/api/projectApi';
import { useAui } from '../../shared/hooks/useAui';
import RepresentImg from './RepresentImg';
import { useProjectInfoListStore } from '../../shared/store/projectInfoListStore';
import { ProjectData } from '../../shared/store/projectStore';

const ProjectDetailContainer: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { aui } = useAui();
  const { isLoading, error, project, updateProject } = useProjectDetail();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [supportedBy, setSupprotedBy] = useState("");
  const [date, setDate] = useState("");

  const { projectInfoList, setProjectInfoList, createInfoList, removeInfoList } = useProjectInfoListStore();

  const removeTime = (localDateTime: string): string => {
    return localDateTime.split('T')[0];
  }

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setBackgroundImageUrl(project.originUrl);
      setSupprotedBy(project.supportedBy);
      setDate(removeTime(project.startDate) + " ~ " + removeTime(project.endDate))
    }
  }, [project]);

  const handleConfirm = async () => {
    if (!project) return;

    const updatedData: UpdateProjectReq = {
      id: project.id,
      originUrl: backgroundImageUrl,
      thumbnailUrl: backgroundImageUrl,
      title: title,
      description: description,
      startDate: date.split(" ~ ")[0],
      endDate: date.split(" ~ ")[1],
      supportedBy: supportedBy,
      createdProjectInfoList: createInfoList,
      updatedProjectInfoList: projectInfoList,
      removedProjectInfoList: removeInfoList,
      isDeleted: false,
    };

    await updateProject(aui, updatedData);
  };

  // const isChanged = (initialData: ProjectData, currentData: UpdateProjectReq): boolean => {
  const isChanged = (initialData: ProjectData): boolean => {
    const currentData = {
      id: initialData.id,
      originUrl: backgroundImageUrl,
      thumbnailUrl: backgroundImageUrl,
      title: title,
      description: description,
      startDate: date.split(" ~ ")[0],
      endDate: date.split(" ~ ")[1],
      supportedBy: supportedBy,
      createdProjectInfoList: createInfoList,
      updatedProjectInfoList: projectInfoList,
      removedProjectInfoList: removeInfoList,
      isDeleted: false
    };
    return (
      initialData.originUrl !== currentData.originUrl ||
      initialData.title !== currentData.title ||
      initialData.startDate !== currentData.startDate ||
      initialData.endDate !== currentData.endDate ||
      initialData.supportedBy !== currentData.supportedBy ||
      initialData.projectInfoList !== currentData.updatedProjectInfoList ||
      (currentData.createdProjectInfoList?.length ?? 0) > 0 ||
      (currentData.removedProjectInfoList?.length ?? 0) > 0
    );
  };


  return (
    <>
      {isEditMode && project && isChanged(project) ?
        <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton> : null
      }
      <RepresentImg backgroundImg={backgroundImageUrl} setBackgroundImg={setBackgroundImageUrl} />
      <ProjectDetailContainerComp>
        <ProjectTitle title={title} setTitle={setTitle} />
        <Divider dividerType={DividerType.PLAIN} />
        <ProjectInfoList
          date={date}
          setDate={setDate}
          supportedBy={supportedBy}
          setSupportedBy={setSupprotedBy}
        />
      </ProjectDetailContainerComp>
    </>
  );
}

const ProjectDetailContainerComp = styled.section`
  padding: calc(8vh) calc(10vw);
`;

const ConfirmButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.colors.color_White};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

export default ProjectDetailContainer;