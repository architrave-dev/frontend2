import { useState } from 'react';
import { ProjectData, useProjectStore } from '../store/projectStore';
import { ProjectResponse, getProjectDetail } from '../api/projectApi';


interface UseProjectResult {
  isLoading: boolean;
  error: string | null;
  project: ProjectData | null;
  getProjectDetail: (aui: string, title: string) => Promise<void>;
}

export const useProjectDetail = (): UseProjectResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { project, setProject } = useProjectStore();


  const handleProjectSuccess = (response: ProjectResponse) => {
    const projectData = response.data;
    console.log("projectData from useProjectDetail: ", projectData);
    setProject(projectData);
  };

  const handleProjectRequest = async <T extends string[]>(
    projectFunction: (...args: T) => Promise<ProjectResponse>,
    ...data: T
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await projectFunction(...data);
      handleProjectSuccess(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectDetailHandler = (aui: string, title: string) => handleProjectRequest(getProjectDetail, aui, title);


  return {
    isLoading,
    error,
    project,
    getProjectDetail: getProjectDetailHandler
  };
};