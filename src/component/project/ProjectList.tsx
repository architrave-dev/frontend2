import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProjectSimple from './ProjectSimple';
import { useProjectList } from '../../shared/hooks/useProjectList';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { CreateProjectReq, createProject } from '../../shared/api/projectApi';
import { useNavigate } from 'react-router-dom';

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const { isEditMode } = useEditMode();
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

  const handleCreateProject = async () => {
    const newDummyProject: CreateProjectReq = {
      originUrl: process.env.REACT_APP_DEFAULT_IMG || '',
      thumbnailUrl: process.env.REACT_APP_DEFAULT_IMG || '',
      title: 'new_Project',
      description: 'This is a new project.'
    };

    await createProject(aui, newDummyProject);
    navigate(`/${aui}/projects/new_Project`);
  };

  return (
    <ProjectSimpleList>
      {isEditMode && (
        <CreateProjectButton onClick={handleCreateProject}>
          Create Project
        </CreateProjectButton>
      )}
      {projects.map((each, idx) => (
        <ProjectSimple
          key={idx}
          projectId={each.id}
          initialTitle={each.title}
          initialDescription={each.description}
          initialImage={each.originUrl}
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

const CreateProjectButton = styled.button`
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: 16px;
`;

export default ProjectList;