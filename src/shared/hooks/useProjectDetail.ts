import { useState } from 'react';
import { ProjectData, useProjectStore } from '../store/projectStore';
import { ProjectResponse, UpdateProjectReq, getProjectDetail, updateProject } from '../api/projectApi';
import { useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../store/projectInfoListStore';


interface UseProjectResult {
  isLoading: boolean;
  error: string | null;
  project: ProjectData | null;
  getProject: (aui: string, title: string) => Promise<void>;
  updateProject: (aui: string, data: UpdateProjectReq) => Promise<void>;
}

export const useProjectDetail = (): UseProjectResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { project, setProject } = useProjectStore();
  const { setProjectInfoList } = useProjectInfoListStore()
  const { clearAll } = useProjectInfoListStoreForUpdate()


  const handleProjectSuccess = (response: ProjectResponse) => {
    const projectData = response.data;
    setProject(projectData);
    setProjectInfoList(projectData.projectInfoList);
    clearAll();
  };

  const handleProjectRequest = async (
    aui: string,
    title: string | null,
    data?: UpdateProjectReq
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (data) {
        const response = await updateProject(aui, data);
        handleProjectSuccess(response);
      } else if (title) {
        const response = await getProjectDetail(aui, title);
        handleProjectSuccess(response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectHandler = (aui: string, title: string) => handleProjectRequest(aui, title);
  const updateProjectHandler = (aui: string, data: UpdateProjectReq) => handleProjectRequest(aui, null, data);


  return {
    isLoading,
    error,
    project,
    getProject: getProjectHandler,
    updateProject: updateProjectHandler
  };
};