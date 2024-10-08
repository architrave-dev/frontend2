import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProjectSimple from './ProjectSimple';
import { useProjectList } from '../../shared/hooks/useProjectList';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { CreateProjectReq, createProject } from '../../shared/api/projectApi';
import { useNavigate } from 'react-router-dom';
import Space from '../../shared/Space';
import { BtnCreateWide } from '../../shared/component/headless/button/BtnBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';

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

  const handleCreate = async () => {
    const newTitle = 'new_Project_' + (projects.length + 1)
    const newDummyProject: CreateProjectReq = {
      originUrl: process.env.REACT_APP_DEFAULT_IMG || '',
      thumbnailUrl: process.env.REACT_APP_DEFAULT_IMG || '',
      title: newTitle,
      description: 'This is a new project.'
    };
    try {
      await createProject(aui, newDummyProject);
      navigate(`/${aui}/projects/` + newTitle);
    } catch (error) {
      console.error('create Project failed:', error);
    }
  };

  return (
    <ProjectSimpleList>
      <Space >
        {isEditMode &&
          <HeadlessBtn
            value={"Create Project"}
            handleClick={handleCreate}
            StyledBtn={BtnCreateWide}
          />
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

export default ProjectList;