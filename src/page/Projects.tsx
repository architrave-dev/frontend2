import React, { useEffect } from 'react';
import styled from 'styled-components';
import LandingBox from '../component/project/LandingBox';
import Space from '../shared/Space';
import { useParams } from 'react-router-dom';
import { useAuiValidation } from '../shared/hooks/useAuiValidation';
import { useAuth } from '../shared/hooks/useAuth';
import { UserData } from '../shared/store/authStore';
import ProjectList from '../component/project/ProjectList';


const Projects: React.FC = () => {
  const { AUI } = useParams<{ AUI: string }>();
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

  return (
    <ProjectsPage>
      <LandingBox />
      <Space />
      <ProjectList />
    </ProjectsPage>
  );
}
const ProjectsPage = styled.div`
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default Projects;