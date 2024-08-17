import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import ProjectElement from '../../component/projectElement/ProjectElement';
import { useProjectDetail } from '../../shared/hooks/useProjectDetail';


const ProjectElementList: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { isLoading, project } = useProjectDetail();
  const [projectElementList, setProjectElementList] = useState(project?.projectElementList);

  useEffect(() => {
    if (project) {
      setProjectElementList(project.projectElementList);
    }
  }, [project]);

  return (
    <ProjectElementListComp>
      {projectElementList && projectElementList.map((each, index) => (
        <ProjectElement
          key={index}
          id={each.id}
          projectElementType={each.projectElementType}
          // order={each.order}
          work={each.work}
          workAlignment={each.workAlignment}
          textBox={each.textBox}
          textBoxAlignment={each.textBoxAlignment}
          dividerType={each.dividerType}
        />
      ))}
    </ProjectElementListComp>
  );
}

const ProjectElementListComp = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 120px;
  padding: 0 calc(10vw);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ProjectElementList;