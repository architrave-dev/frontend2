import { useState } from 'react';
import { ProjectSimpleData, useProjectListStore } from '../store/projectListStore';
import { ProjectResponse, getProjectList } from '../api/projectApi';


interface UseProjectListResult {
  isLoading: boolean;
  error: string | null;
  projects: ProjectSimpleData[];
  getProjectList: (data: string) => Promise<void>;
}

export const useProjectList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { projects, setProjects } = useProjectListStore();

  const handleLandingBoxSuccess = (response: ProjectResponse) => {
    const projectListData = response.data;
    console.log("projectListData from useProjectList: ", projectListData);
    setProjects(projectListData);
  };

  const handleProjectRequest = async <T extends string>(
    projectFunction: (data: T) => Promise<ProjectResponse>,
    data: T
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await projectFunction(data);
      handleLandingBoxSuccess(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };


  const getProjectListHandler = (aui: string) => handleProjectRequest(getProjectList, aui);


  return {
    isLoading,
    error,
    projects,
    getProjectList: getProjectListHandler,
  };
};