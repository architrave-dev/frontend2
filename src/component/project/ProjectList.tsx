import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProjectSimple from './ProjectSimple';
import { useProjectList } from '../../shared/hooks/useApi/useProjectList';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import Space from '../../shared/Space';
import { BtnCreate } from '../../shared/component/headless/button/BtnBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { projectBuilder } from '../../shared/converter/entityBuilder';
import { ModalType } from '../../shared/enum/EnumRepository';
import { useModalStore } from '../../shared/store/portal/modalStore';
const ProjectList: React.FC = () => {
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { projects, getProjectList, createProject } = useProjectList();
  const { setStandardModal } = useModalStore();

  useEffect(() => {
    const getProjectListTemp = async () => {
      if (!aui) return;
      await getProjectList(aui);
    }
    getProjectListTemp();
  }, [aui]);

  const handleCreate = async () => {
    const newIndex = projects.length;
    const newTitle = 'Project_' + (newIndex + 1);
    try {
      await createProject(aui, projectBuilder(newTitle, newIndex));
    } catch (error) {
    } finally {
      setEditMode(false);
    }
  };

  const handleReOrder = () => {
    setStandardModal({
      modalType: ModalType.INDEXING,
      title: "Project",
      value: null,
      handleChange: () => { },
    });
  }

  return (
    <ProjectSimpleList>
      <Space >
        {isEditMode &&
          <BtnContainer>
            <HeadlessBtn
              value={"Create Project"}
              handleClick={handleCreate}
              StyledBtn={BtnCreate}
            />
            <HeadlessBtn
              value={"Reorder"}
              handleClick={handleReOrder}
              StyledBtn={BtnCreate}
            />
          </BtnContainer>
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

const BtnContainer = styled.div`
  position: relative;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5vw;
`

export default ProjectList;