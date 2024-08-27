import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProjectElementList from '../component/projectDetail/ProjectElementList';
import ProjectDetailContainer from '../component/projectDetail/ProjectDetailContainer';
import { useParams } from 'react-router-dom';
import { useAuiValidation } from '../shared/hooks/useAuiValidation';
import { useAuth } from '../shared/hooks/useAuth';
import { UserData } from '../shared/store/authStore';
import { useProjectDetail } from '../shared/hooks/useProjectDetail';
import { useAui } from '../shared/hooks/useAui';
import { useEditMode } from '../shared/hooks/useEditMode';


const ProjectDetail: React.FC = () => {
  const { AUI, projectTitle } = useParams<{ AUI: string, projectTitle: string }>();
  useAuiValidation(AUI);
  const { user, setUser } = useAuth();
  const { isEditMode, setEditMode } = useEditMode();

  useEffect(() => {
    if (!user) {
      const userFromStorage = localStorage.getItem('userData');
      if (userFromStorage) {
        const parsedUserData: UserData = JSON.parse(userFromStorage);
        setUser(parsedUserData);
      } else {
        console.error("there is no login data");
      }
    }
  }, [user]);

  const { aui } = useAui();
  const { isLoading, getProject } = useProjectDetail();

  useEffect(() => {
    const getProjectWithApi = async () => {
      if (aui && projectTitle) {
        await getProject(aui, projectTitle);
      }
    }
    getProjectWithApi();
  }, [aui, projectTitle]);

  useEffect(() => {
    if (isEditMode) {
      setEditMode(false);
    }
  }, []);

  return (
    <ProjectDetailPage>
      <ProjectDetailContainer />
      <ProjectElementList />
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