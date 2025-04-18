import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { BtnCreate } from '../../shared/component/headless/button/BtnBody';
import { piBuilder } from '../../shared/converter/entityBuilder';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { useProjectInfo } from '../../shared/hooks/useApi/useProjectInfo';
import { useAui } from '../../shared/hooks/useAui';
import ProjectInfo from './ProjectInfo';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import Space from '../../shared/Space';
import { useParams } from 'react-router-dom';
import { ModalType } from '../../shared/enum/EnumRepository';
import { useModalStore } from '../../shared/store/portal/modalStore';

const ProjectInfoList: React.FC = () => {
  const { aui } = useAui();
  const { projectId } = useParams<{ projectId: string }>();
  const { isEditMode } = useEditMode();
  const { project } = useProjectDetail();
  const { getProjectInfoList, createProjectInfo, projectInfoList } = useProjectInfo();
  const { setStandardModal } = useModalStore();

  useEffect(() => {
    if (!aui || !project || !projectId) return;
    if (projectId !== project.id.toString()) return;

    const fetchProjectInfo = async () => {
      console.log("getting projectInfoList... projectId: ", project.id);
      await getProjectInfoList(aui, project.id);
    };

    fetchProjectInfo();
  }, [aui, projectId, project?.id]);

  if (project == null) return null;

  const handleCreateInfo = async () => {
    const newIndex = projectInfoList.length;
    await createProjectInfo(aui, piBuilder(project.id, newIndex));
  };

  const handleReOrder = () => {
    setStandardModal({
      modalType: ModalType.INDEXING,
      title: "Info",
      value: null,
      handleChange: () => { },
    });
  }

  return (
    <ProjectInfoListComp>
      {projectInfoList && projectInfoList.map((each, index) =>
        <ProjectInfo key={index + "_" + each.id} data={each} />
      )}
      <Space $align={"center"} $height={"calc(6vw)"}>
        {isEditMode &&
          <BtnContainer>
            <HeadlessBtn
              value={"Info"}
              handleClick={handleCreateInfo}
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
    </ProjectInfoListComp>
  );
}

const ProjectInfoListComp = styled.article`
  position: relative;
`;

const BtnContainer = styled.div`
  position: relative;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5vw;
`

export default ProjectInfoList;