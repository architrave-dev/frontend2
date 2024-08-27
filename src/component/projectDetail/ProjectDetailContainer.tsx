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
import { useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import { ProjectData } from '../../shared/store/projectStore';

const ProjectDetailContainer: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { aui } = useAui();
  const { isLoading, error, project, updateProject } = useProjectDetail();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [supportedBy, setSupprotedBy] = useState("");
  const [date, setDate] = useState("");

  const { createInfoList, updateInfoList, removeInfoList } = useProjectInfoListStoreForUpdate();

  const removeTime = (localDateTime: string): string => {
    return localDateTime.split('T')[0];
  }
  const getToday = (): string => {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const formattedDate = date.toISOString().split('T')[0]; // '0000-00-00' 형식으로 포맷팅
    return formattedDate;
  }

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setBackgroundImageUrl(project.originUrl);
      setSupprotedBy(project.supportedBy ? project.supportedBy : ' ');
      setDate(
        (project.startDate && project.endDate) ?
          removeTime(project.startDate) + " ~ " + removeTime(project.endDate)
          : getToday() + ' ~ ' + getToday()
      )
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
      updatedProjectInfoList: updateInfoList,
      removedProjectInfoList: removeInfoList,
      isDeleted: false,
    };

    await updateProject(aui, updatedData);
    setEditMode(false);
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
      updatedProjectInfoList: updateInfoList,
      removedProjectInfoList: removeInfoList,
      isDeleted: false
    };
    return (
      initialData.originUrl !== currentData.originUrl ||
      initialData.title !== currentData.title ||
      initialData.startDate !== currentData.startDate ||
      initialData.endDate !== currentData.endDate ||
      initialData.supportedBy !== currentData.supportedBy ||
      (currentData.createdProjectInfoList?.length ?? 0) > 0 ||
      (currentData.updatedProjectInfoList?.length ?? 0) > 0 ||
      (currentData.removedProjectInfoList?.length ?? 0) > 0
    );
  };


  return (
    <ProjectDetailContainerComp>
      {isEditMode && project && isChanged(project) ?
        <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton> : null
      }
      <RepresentImg backgroundImg={backgroundImageUrl} setBackgroundImg={setBackgroundImageUrl} />
      <ProjectDetailWrapper>
        <ProjectTitle title={title} setTitle={setTitle} />
        <Divider dividerType={DividerType.PLAIN} />
        <ProjectInfoList
          date={date}
          setDate={setDate}
          supportedBy={supportedBy}
          setSupportedBy={setSupprotedBy}
        />
      </ProjectDetailWrapper>
    </ProjectDetailContainerComp>
  );
}

const ProjectDetailContainerComp = styled.section`
  position: relative;
`;
const ProjectDetailWrapper = styled.article`
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