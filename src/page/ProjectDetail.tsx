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


const ProjectDetail: React.FC = () => {
  const { AUI, projectTitle } = useParams<{ AUI: string, projectTitle: string }>();
  useAuiValidation(AUI);
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("UserData from store: ", user);
    } else {
      const userFromStorage = localStorage.getItem('userData');
      if (userFromStorage) {
        const parsedUserData: UserData = JSON.parse(userFromStorage);
        setUser(parsedUserData);
      } else {
        console.log("there is no login data");
      }
    }
  }, [user]);

  const { aui } = useAui();
  const { isLoading, project, getProject } = useProjectDetail();

  useEffect(() => {
    const getProjectWithApi = async () => {
      if (aui && projectTitle) {
        await getProject(aui, projectTitle);
      }
    }
    getProjectWithApi();
  }, [aui, projectTitle]);

  useEffect(() => {
    console.log("project in ProjectDetail: ", project);
  }, [project]);


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