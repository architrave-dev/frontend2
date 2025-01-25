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
import { UpdateProjectReq } from '../shared/dto/ReqDtoRepository';
import { IndexData } from '../shared/dto/EntityRepository';
import { ServiceType } from '../shared/enum/EnumRepository';
import { useLoadingStore } from '../shared/store/loadingStore';
import Loading from '../shared/component/Loading';
import { useProjectStore } from '../shared/store/projectStore';
import { useImage } from '../shared/hooks/useApi/useImage';


const ProjectDetail: React.FC = () => {
  useInitPage();
  const { isLoading } = useLoadingStore();
  const { projectId } = useParams<{ projectId: string }>();
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { project, getProject, updateProject } = useProjectDetail();
  const { hasChanged, imageChanged } = useProjectStore();
  const { uploadImage } = useImage();

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

  if (!project) return null;

  const convertToPiIndexList = (): IndexData[] => {
    return [];
  }

  const handleConfirm = async () => {
    if (!project || !aui) return;
    try {
      const baseRequest: UpdateProjectReq = {
        ...project,  //projectDetailCheck에서 확인 함
        updateUploadFileReq: {
          uploadFileId: project.uploadFile.id,
          ...project.uploadFile
        },
        piIndexList: convertToPiIndexList(),
      }

      const finalRequest = imageChanged
        ? await uploadImage(aui, ServiceType.PROJECT, baseRequest)
        : baseRequest;

      await updateProject(aui, finalRequest as UpdateProjectReq);
      setEditMode(false);
    } catch (err) {
    }
  };

  return (
    <ProjectDetailPage>
      <Loading isLoading={isLoading} />
      <ProjectDetailContainer />
      <ProjectElementList />
      {isEditMode && hasChanged &&
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