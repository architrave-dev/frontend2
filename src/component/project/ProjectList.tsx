import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProjectSimple from './ProjectSimple';
import { useProjectList } from '../../shared/hooks/useApi/useProjectList';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import Space from '../../shared/Space';
import { BtnCreateWide } from '../../shared/component/headless/button/BtnBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { CreateProjectReq } from '../../shared/dto/ReqDtoRepository';

const ProjectList: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { projects, getProjectList, createProject } = useProjectList();

  const { aui } = useAui();

  useEffect(() => {
    const getProjectListTemp = async () => {
      if (!aui) return;
      try {
        await getProjectList(aui);
      } catch (error) { }
    }
    getProjectListTemp();
  }, [aui]);

  const handleCreate = async () => {
    const newTitle = 'new_Project_' + (projects.length + 1)
    const newDummyProject: CreateProjectReq = {
      originUrl: '',
      thumbnailUrl: '',
      title: newTitle,
      description: 'This is a new project.'
    };
    try {
      await createProject(aui, newDummyProject);
      // const { data: { id: projectId } } = await createProject(aui, newDummyProject);
      // navigate(`/${aui}/projects/` + projectId + "isEditMode=true");
    } catch (error) {
    } finally {
      setEditMode(false);
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