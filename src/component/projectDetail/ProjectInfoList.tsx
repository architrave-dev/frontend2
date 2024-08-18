import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import ProjectInfo from '../../component/projectDetail/ProjectInfo';
import { useProjectDetail } from '../../shared/hooks/useProjectDetail';

const ProjectInfoList: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { isLoading, project } = useProjectDetail();
  const [projectInfoList, setProjectInfoList] = useState(project?.projectInfoList);

  useEffect(() => {
    if (project) {
      setProjectInfoList(project.projectInfoList);
    }
  }, [project]);

  return (
    <ProjectInfoListComp>
      {projectInfoList && projectInfoList.map((each, index) => (
        <ProjectInfo
          key={index}
          initialCustomName={each.customName}
          initialCustomValue={each.customValue}
          isEditMode={isEditMode}
        />
      ))}
    </ProjectInfoListComp>
  );
}

const ProjectInfoListComp = styled.article`
  margin-bottom: calc(6vw);
`;

export default ProjectInfoList;