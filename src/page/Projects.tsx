import React, { useEffect } from 'react';
import styled from 'styled-components';
import LandingBox from '../component/project/LandingBox';
import { useParams } from 'react-router-dom';
import { useAuiValidation } from '../shared/hooks/useAuiValidation';
import { useAuth } from '../shared/hooks/useAuth';
import { UserData } from '../shared/store/authStore';
import ProjectList from '../component/project/ProjectList';
import { useEditMode } from '../shared/hooks/useEditMode';


const Projects: React.FC = () => {
  const { AUI } = useParams<{ AUI: string }>();
  useAuiValidation(AUI);

  const { isEditMode, setEditMode } = useEditMode();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (isEditMode) {
      setEditMode(false);
    }
  }, []);

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

  return (
    <ProjectsPage>
      <LandingBox />
      <ProjectList />
    </ProjectsPage>
  );
}
const ProjectsPage = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default Projects;