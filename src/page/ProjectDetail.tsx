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
import { CreateDocumentReq, CreateProjectElementReq, CreateWorkReq, UpdateDocumentReq, UpdateProjectElementListReq, UpdateProjectElementReq, UpdateProjectReq, UpdateUploadFileReq, UpdateWorkReq } from '../shared/dto/ReqDtoRepository';
import { useProjectElement } from '../shared/hooks/useApi/useProjectElement';
import { IndexData } from '../shared/dto/EntityRepository';
import { ProjectElementType, ServiceType } from '../shared/enum/EnumRepository';
import { base64ToFileWithMime, uploadToS3 } from '../shared/aws/s3Upload';
import { ErrorCode } from '../shared/api/errorCode';


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
    // createdProjectElements,
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

  if (!project || !updatedProjectDto) return null;
  const projectDetailCheck = (): boolean => {
    return (
      project.uploadFile !== updatedProjectDto.uploadFile ||
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
      // createdProjectElements.length > 0 ||
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

  const uploadFileWithLocalUrl = async (serviceType: ServiceType, prevData: UpdateProjectReq, aui: string): Promise<UpdateProjectReq> => {
    const localImageUrl = prevData.updateUploadFileReq.originUrl;
    const file = base64ToFileWithMime(localImageUrl);
    try {
      const { originUrl, thumbnailUrl } = await uploadToS3(file, aui, serviceType, [prevData.id]);
      return {
        ...prevData,
        updateUploadFileReq: { ...prevData.updateUploadFileReq, originUrl, thumbnailUrl }
      };
    } catch (error) {
      throw new Error(ErrorCode.AWS);
    }
  }

  const imageChecker = () => {
    return project.uploadFile.originUrl !== updatedProjectDto.uploadFile.originUrl;
  }

  const uploadFileWithLocalUrlUpdates = async <T extends { id: string, updateUploadFileReq: UpdateUploadFileReq }>(
    serviceType: ServiceType,
    prevData: T,
    aui: string
  ): Promise<T> => {
    const localImageUrl = prevData.updateUploadFileReq.originUrl;
    const file = base64ToFileWithMime(localImageUrl);
    try {
      const { originUrl, thumbnailUrl } = await uploadToS3(file, aui, serviceType, [prevData.id]);
      return {
        ...prevData,
        updateUploadFileReq: { ...prevData.updateUploadFileReq, originUrl, thumbnailUrl }
      };
    } catch (error) {
      throw new Error(ErrorCode.AWS);
    }
  };

  // const uploadFileWithLocalUrlCreates = async <T extends { originUrl: string, thumbnailUrl: string }>(
  //   serviceType: ServiceType,
  //   prevData: T,
  //   aui: string
  // ): Promise<T> => {
  //   const localImageUrl = prevData.originUrl;
  //   const file = base64ToFileWithMime(localImageUrl);
  //   try {
  //     //work면 work에,
  //     //document면 project에

  //     //import 애들은...?
  //     const { originUrl, thumbnailUrl } = await uploadToS3(file, aui, serviceType, [prevData ]);
  //     return {
  //       ...prevData,
  //       originUrl,
  //       thumbnailUrl
  //     };
  //   } catch (error) {
  //     throw new Error(ErrorCode.AWS);
  //   }
  // };

  const handleConfirm = async () => {
    if (updatedProjectDto == null) return null;
    try {
      if (projectDetailCheck()) {
        let newUpdateProjectReq: UpdateProjectReq = {
          ...updatedProjectDto,  //projectDetailCheck에서 확인 함
          updateUploadFileReq: {
            uploadFileId: updatedProjectDto.uploadFile.id,
            ...updatedProjectDto.uploadFile
          },
          piIndexList: convertToPiIndexList(),
          createdProjectInfoList: createPiList,
          updatedProjectInfoList: updatePiList,
          removedProjectInfoList: removePiList
        }
        if (imageChecker()) {
          newUpdateProjectReq = await uploadFileWithLocalUrl(ServiceType.PROJECT, newUpdateProjectReq, aui);
        }
        await updateProject(aui, newUpdateProjectReq);
      }
      if (peListCheck()) {
        // updatedProjectElements 돌면서 변경되었다면 upload
        const updatespromises = updatedProjectElements.map(async (pe) => {
          if (pe.updateWorkReq != null) {
            const convertedUpdateWorkReq = await uploadFileWithLocalUrlUpdates<UpdateWorkReq>(ServiceType.WORK, pe.updateWorkReq, aui);
            return {
              ...pe,
              updateWorkReq: convertedUpdateWorkReq,
            };
          } else if (pe.updateDocumentReq != null) {
            const convertedUpdateDocumentReq = await uploadFileWithLocalUrlUpdates<UpdateDocumentReq>(ServiceType.DOCUMENT, pe.updateDocumentReq, aui);
            return { ...pe, updateDocumentReq: convertedUpdateDocumentReq };
          } else {
            return pe;
          }
        });

        const afterUploadUpdates: UpdateProjectElementReq[] = await Promise.all(updatespromises);
        console.log("afterUpload: ", afterUploadUpdates);

        // const createspromises = createdProjectElements.map(async (pe) => {
        //   if (pe.projectElementType === ProjectElementType.WORK &&
        //     pe.createWorkReq != null
        //   ) {
        //     const convertedUpdateWorkReq: CreateWorkReq = await uploadFileWithLocalUrlCreates<CreateWorkReq>(ServiceType.WORK, pe.createWorkReq, aui);
        //     return {
        //       ...pe,
        //       createWorkReq: convertedUpdateWorkReq,
        //     };
        //   } else if (pe.projectElementType === ProjectElementType.DOCUMENT &&
        //     pe.createDocumentReq != null) {
        //     const convertedUpdateDocumentReq: CreateDocumentReq = await uploadFileWithLocalUrlCreates<CreateDocumentReq>(ServiceType.DOCUMENT, pe.createDocumentReq, aui);
        //     return { ...pe, createDocumentReq: convertedUpdateDocumentReq };
        //   } else {
        //     return pe;
        //   }
        // });

        // const afterUploadCreates: CreateProjectElementReq[] = await Promise.all(createspromises);
        // console.log("afterUploadCreates: ", afterUploadCreates);



        const updatedData: UpdateProjectElementListReq = {
          projectId: project.id, //peListCheck 확인 함
          peIndexList: [],
          // createProjectElements: createdProjectElements,
          updatedProjectElements: afterUploadUpdates,
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