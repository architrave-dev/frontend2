import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProjectElementList from '../component/projectDetail/ProjectElementList';
import ProjectDetailContainer from '../component/projectDetail/ProjectDetailContainer';
import { useParams } from 'react-router-dom';
import { useProjectDetail } from '../shared/hooks/useApi/useProjectDetail';
import { useAui } from '../shared/hooks/useAui';
import { useInitPage } from '../shared/hooks/useInitPage';
import HeadlessBtn from '../shared/component/headless/button/HeadlessBtn';
import { BtnConfirm } from '../shared/component/headless/button/BtnBody';
import { useEditMode } from '../shared/hooks/useEditMode';
import { useProjectStoreForUpdate } from '../shared/store/projectStore';
import { useProjectInfoListStoreForUpdate } from '../shared/store/projectInfoListStore';
import { useProjectElementListStoreForUpdate } from '../shared/store/projectElementStore';
import { UpdateProjectElementListReq, UpdateProjectReq } from '../shared/dto/ReqDtoRepository';
import { useProjectElement } from '../shared/hooks/useApi/useProjectElement';
import { IndexData } from '../shared/dto/EntityRepository';


const ProjectDetail: React.FC = () => {
  useInitPage();
  const { projectId } = useParams<{ projectId: string }>();
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { project, getProject, updateProject } = useProjectDetail();
  const { updatedProjectDto } = useProjectStoreForUpdate();
  const { createPiList, updatePiList, removePiList } = useProjectInfoListStoreForUpdate();
  const { updateProjectElementList } = useProjectElement();
  const {
    createdProjectElements,
    updatedProjectElements,
    removedProjectElements
  } = useProjectElementListStoreForUpdate();

  useEffect(() => {
    const getProjectWithApi = async () => {
      if (!(aui && projectId)) return;
      try {
        console.log("getting ProjectDetail...")
        await getProject(aui, projectId);
      } catch (error) { }
    }
    getProjectWithApi();
  }, [aui, projectId]);

  const projectDetailCheck = (): boolean => {
    if (!project || !updatedProjectDto) {
      return false;
    }
    return (
      project.originUrl !== updatedProjectDto.originUrl ||
      project.thumbnailUrl !== updatedProjectDto.thumbnailUrl ||
      project.title !== updatedProjectDto.title ||
      project.description !== updatedProjectDto.description ||
      (createPiList.length ?? 0) > 0 ||
      (updatePiList.length ?? 0) > 0 ||
      (removePiList.length ?? 0) > 0
    );
  }

  const peListCheck = (): boolean => {
    if (!project) {
      return false;
    }
    return (
      createdProjectElements.length > 0 ||
      updatedProjectElements.length > 0 ||
      removedProjectElements.length > 0
    );
  }
  const isUnitedChanged = (): boolean => {
    return projectDetailCheck() || peListCheck();
  }
  const convertToPiIndexList = (): IndexData[] => {
    return [];
  }

  const handleConfirm = async () => {
    try {
      if (projectDetailCheck()) {
        const newUpdateProjectReq: UpdateProjectReq = {
          ...updatedProjectDto!,  //projectDetailCheck에서 확인 함
          piIndexList: convertToPiIndexList(),
          createdProjectInfoList: createPiList,
          updatedProjectInfoList: updatePiList,
          removedProjectInfoList: removePiList
        }
        await updateProject(aui, newUpdateProjectReq);
      }
      if (peListCheck()) {
        const updatedData: UpdateProjectElementListReq = {
          projectId: project!.id, //peListCheck 확인 함
          peIndexList: [],
          createProjectElements: createdProjectElements,
          updatedProjectElements: updatedProjectElements,
          removedProjectElements: removedProjectElements
        }
        await updateProjectElementList(aui, updatedData);
      }
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  };


  return (
    <ProjectDetailPage>
      <ProjectDetailContainer />
      <ProjectElementList />
      {isEditMode && isUnitedChanged() &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
    </ProjectDetailPage>
  );
}

const ProjectDetailPage = styled.div`
  width: 100vw;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default ProjectDetail;