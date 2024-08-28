import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProjectSimple from './ProjectSimple';
import { useProjectList } from '../../shared/hooks/useProjectList';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { CreateProjectReq, createProject } from '../../shared/api/projectApi';
import { useNavigate } from 'react-router-dom';
import Space from '../../shared/Space';

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
    try {
      await createProject(aui, newDummyProject);
      navigate(`/${aui}/projects/new_Project`);
    } catch (error) {
      console.error('create Project failed:', error);
    }
  };

  return (
    <ProjectSimpleList>
      <Space >
        {isEditMode &&
          <CreateProjectButton onClick={handleCreateProject}>
            Create Project
          </CreateProjectButton>
        }
      </Space>
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
  margin-bottom: 6vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CreateProjectButton = styled.button`
  width: 50vw;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.color_White};
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_05};
  }
`;

export default ProjectList;