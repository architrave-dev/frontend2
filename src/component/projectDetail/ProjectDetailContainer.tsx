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
import ConfirmButton from '../../shared/component/ConfirmButton';

const ProjectDetailContainer: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { aui } = useAui();
  const { isLoading, error, project, updateProject } = useProjectDetail();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const { createInfoList, updateInfoList, removeInfoList } = useProjectInfoListStoreForUpdate();

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setBackgroundImageUrl(project.originUrl);
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
      createdProjectInfoList: createInfoList,
      updatedProjectInfoList: updateInfoList,
      removedProjectInfoList: removeInfoList,
      isDeleted: false
    };
    return (
      initialData.originUrl !== currentData.originUrl ||
      initialData.title !== currentData.title ||
      (currentData.createdProjectInfoList?.length ?? 0) > 0 ||
      (currentData.updatedProjectInfoList?.length ?? 0) > 0 ||
      (currentData.removedProjectInfoList?.length ?? 0) > 0
    );
  };


  return (
    <ProjectDetailContainerComp>
      {isEditMode && project && isChanged(project) &&
        <ConfirmButton handleConfirm={handleConfirm} />
      }
      <RepresentImg backgroundImg={backgroundImageUrl} setBackgroundImg={setBackgroundImageUrl} />
      <ProjectDetailWrapper>
        <ProjectTitle title={title} setTitle={setTitle} />
        <Divider dividerType={DividerType.PLAIN} />
        <ProjectInfoList />
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

export default ProjectDetailContainer;