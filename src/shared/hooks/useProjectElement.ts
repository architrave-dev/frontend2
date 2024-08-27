import { useState } from 'react';
import { ProjectElementListResponse, UpdateProjectElementListReq, getProjectElementList, updateProjectElementList } from '../api/projectElementApi';
import { ProjectElementData, useProjectElementListStore, useProjectElementListStoreForUpdate } from '../store/projectElementStore';


interface UseProjectElementResult {
  isLoading: boolean;
  error: string | null;
  projectElementList: ProjectElementData[];
  getProjectElementList: (aui: string, title: string) => Promise<void>;
  updateProjectElementList: (aui: string, data: UpdateProjectElementListReq) => Promise<void>;
}

export const useProjectElement = (): UseProjectElementResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { clearAll } = useProjectElementListStoreForUpdate();


  const handleProjectElementSuccess = (response: ProjectElementListResponse) => {
    const projectElementListData = response.data;
    setProjectElementList(projectElementListData);
    clearAll();
  };

  const handleProjectElementRequest = async (
    aui: string,
    title: string | null,
    data?: UpdateProjectElementListReq
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (data) {
        const response = await updateProjectElementList(aui, data);
        handleProjectElementSuccess(response);
      } else if (title) {
        const response = await getProjectElementList(aui, title);
        handleProjectElementSuccess(response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectElementHandler = (aui: string, projectTitle: string) => handleProjectElementRequest(aui, projectTitle);
  const updateProjectDetailHandler = (aui: string, data: UpdateProjectElementListReq) => handleProjectElementRequest(aui, null, data);


  return {
    isLoading,
    error,
    projectElementList,
    getProjectElementList: getProjectElementHandler,
    updateProjectElementList: updateProjectDetailHandler,
  };
};