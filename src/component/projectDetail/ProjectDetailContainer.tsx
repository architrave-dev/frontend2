import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectTitle from '../../component/projectDetail/ProjectTitle';
import Divider, { DividerType } from '../../shared/Divider';
import ProjectInfoList from '../../component/projectDetail/ProjectInfoList';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { UpdateProjectReq } from '../../shared/api/projectApi';
import { useAui } from '../../shared/hooks/useAui';
import RepresentImg from './RepresentImg';
import { useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import { ProjectData } from '../../shared/store/projectStore';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnConfirm } from '../../shared/component/headless/button/BtnBody';
import Loading from '../../shared/component/Loading';

const ProjectDetailContainer: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { aui } = useAui();
  const { isLoading, project, updateProject } = useProjectDetail();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");

  const { createInfoList, updateInfoList, removeInfoList } = useProjectInfoListStoreForUpdate();

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setBackgroundImageUrl(project.originUrl);
      setThumbnailImageUrl(project.thumbnailUrl);
    }
  }, [project]);

  const handleConfirm = async () => {
    if (!project) return;

    const updatedData: UpdateProjectReq = {
      id: project.id,
      originUrl: backgroundImageUrl,
      thumbnailUrl: thumbnailImageUrl,
      title: title,
      description: description,
      piIndexList: [],  //이걸 어쩌나...
      createdProjectInfoList: createInfoList,
      updatedProjectInfoList: updateInfoList,
      removedProjectInfoList: removeInfoList,
    };

    try {
      await updateProject(aui, updatedData);
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  };

  // const isChanged = (initialData: ProjectData, currentData: UpdateProjectReq): boolean => {
  const isChanged = (initialData: ProjectData): boolean => {
    const currentData = {
      id: initialData.id,
      originUrl: backgroundImageUrl,
      thumbnailUrl: thumbnailImageUrl,
      title: title,
      description: description,
      createdProjectInfoList: createInfoList,
      updatedProjectInfoList: updateInfoList,
      removedProjectInfoList: removeInfoList
    };
    return (
      initialData.originUrl !== currentData.originUrl ||
      initialData.title !== currentData.title ||
      (currentData.createdProjectInfoList?.length ?? 0) > 0 ||
      (currentData.updatedProjectInfoList?.length ?? 0) > 0 ||
      (currentData.removedProjectInfoList?.length ?? 0) > 0
    );
  };

  // 로딩 상태를 처리합니다.
  if (isLoading) return <Loading />;

  return (
    <ProjectDetailContainerComp>
      {isEditMode && project && isChanged(project) &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
      <RepresentImg
        backgroundImg={backgroundImageUrl}
        setBackgroundImg={setBackgroundImageUrl}
        setThumbnailImg={setThumbnailImageUrl}
      />
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