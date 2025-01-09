import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectInfoListStore } from '../../shared/store/projectInfoStore';
import { BtnCreate } from '../../shared/component/headless/button/BtnBody';
import { piBuilder } from '../../shared/converter/EntityBuilder';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { useProjectInfo } from '../../shared/hooks/useApi/useProjectInfo';
import { useAui } from '../../shared/hooks/useAui';
import ProjectInfo from './ProjectInfo';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import Space from '../../shared/Space';

const ProjectInfoList: React.FC = () => {
  const { aui } = useAui();
  const { isEditMode } = useEditMode();
  const { project } = useProjectDetail();
  const { projectInfoList } = useProjectInfoListStore();
  const { createProjectInfo } = useProjectInfo();

  if (project == null) return null;

  const handleCreateInfo = async () => {
    try {
      await createProjectInfo(aui, piBuilder(project.id));
    } catch (err) {
    }
  };

  return (
    <ProjectInfoListComp>
      {projectInfoList && projectInfoList.map((each, index) =>
        <ProjectInfo
          key={index}
          projectInfoId={each.id}
          initialCustomName={each.customName}
          initialCustomValue={each.customValue}
        />
      )}
      <Space $align={"center"} $height={"calc(6vw)"}>
        {isEditMode &&
          <HeadlessBtn
            value={"Info"}
            handleClick={handleCreateInfo}
            StyledBtn={BtnCreate}
          />
        }
      </Space>
    </ProjectInfoListComp>
  );
}

const ProjectInfoListComp = styled.article`
  position: relative;
`;

export default ProjectInfoList;