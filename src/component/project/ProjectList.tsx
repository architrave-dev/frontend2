import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProjectSimple from './ProjectSimple';
import { useProjectList } from '../../shared/hooks/useProjectList';
import { useAui } from '../../shared/hooks/useAui';


const ProjectList: React.FC = () => {
  const { isLoading, projects, getProjectList } = useProjectList();

  const { aui } = useAui();

  useEffect(() => {
    const getProjectListTemp = async () => {
      if (aui) {
        try {
          await getProjectList(aui);
        } catch (error) {
          console.error('get ProjectList failed:', error);
        }
      }
    }
    getProjectListTemp();
  }, [aui]);


  return (
    <ProjectSimpleList>
      {projects.map((each, idx) => (
        <ProjectSimple
          key={idx}
          initialTitle={each.title}
          initialDescription={each.description}
          initialImage={each.originalImageUrl}
        />
      ))}
    </ProjectSimpleList>
  );
}

const ProjectSimpleList = styled.section`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ProjectList;