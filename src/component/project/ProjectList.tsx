import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProjectSimple from './ProjectSimple';
import { useProjectList } from '../../shared/hooks/useApi/useProjectList';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import Space from '../../shared/Space';
import { BtnCreateWide } from '../../shared/component/headless/button/BtnBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { projectBuilder } from '../../shared/converter/entityBuilder';

const ProjectList: React.FC = () => {
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { projects, getProjectList, createProject } = useProjectList();

  useEffect(() => {
    const getProjectListTemp = async () => {
      if (!aui) return;
      await getProjectList(aui);
    }
    getProjectListTemp();
  }, [aui]);

  const handleCreate = async () => {
    const newTitle = 'Project_' + (projects.length + 1)
    try {
      await createProject(aui, projectBuilder(newTitle));
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