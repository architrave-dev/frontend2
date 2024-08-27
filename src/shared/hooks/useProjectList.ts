import { useState } from 'react';
import { ProjectSimpleData, useProjectListStore } from '../store/projectListStore';
import { CreateProjectReq, CreatedProjectResponse, ProjectListResponse, ProjectResponse, createProject, getProjectList } from '../api/projectApi';


interface UseProjectListResult {
  isLoading: boolean;
  error: string | null;
  projects: ProjectSimpleData[];
  getProjectList: (aui: string) => Promise<void>;
  createProject: (aui: string, data: CreateProjectReq) => Promise<void>;
}

export const useProjectList = (): UseProjectListResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { projects, setProjects } = useProjectListStore();

  const handleProjectListSuccess = (response: ProjectListResponse) => {
    const projectListData = response.data;
    setProjects(projectListData);
  };

  const handleCreateProjectSuccess = (response: CreatedProjectResponse) => {
    const createdProjectData = response.data;
    setProjects([...projects, createdProjectData]);
  };

  const handleProjectRequest = async (
    aui: string,
    data?: CreateProjectReq
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (data) {
        const response = await createProject(aui, data);
        handleCreateProjectSuccess(response);
      } else {
        const response = await getProjectList(aui);
        handleProjectListSuccess(response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };


  const getProjectListHandler = (aui: string) => handleProjectRequest(aui);
  const createProjectHandler = (aui: string, data: CreateProjectReq) => handleProjectRequest(aui, data);


  return {
    isLoading,
    error,
    projects,
    getProjectList: getProjectListHandler,
    createProject: createProjectHandler
  };
};