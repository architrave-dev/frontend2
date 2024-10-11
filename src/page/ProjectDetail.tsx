import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProjectElementList from '../component/projectDetail/ProjectElementList';
import ProjectDetailContainer from '../component/projectDetail/ProjectDetailContainer';
import { useParams } from 'react-router-dom';
import { useProjectDetail } from '../shared/hooks/useProjectDetail';
import { useAui } from '../shared/hooks/useAui';
import { useInitPage } from '../shared/hooks/useInitPage';


const ProjectDetail: React.FC = () => {
  useInitPage();
  const { projectTitle } = useParams<{ projectTitle: string }>();
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