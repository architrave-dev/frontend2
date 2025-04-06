import React from 'react';
import styled from 'styled-components';
import Bilboard from '../component/project/Billboard';
import ProjectList from '../component/project/ProjectList';
import { useInitPage } from '../shared/hooks/useInitPage';
import { useLoadingStore } from '../shared/store/loadingStore';
import Loading from '../shared/component/Loading';
import { useBillboardStore } from '../shared/store/billboardStore';
import { useShiftTab } from '../shared/hooks/useShiftTab';

const Projects: React.FC = () => {
  useInitPage();
  const { isLoading } = useLoadingStore();
  const { hasChanged } = useBillboardStore();
  const { handleShiftTabForEditMode } = useShiftTab();

  return (
    <ProjectsPage
      onKeyDown={(e) => handleShiftTabForEditMode(e, hasChanged)}
      tabIndex={-1}>
      <Loading isLoading={isLoading} />
      <Bilboard />
      <ProjectList />
    </ProjectsPage>
  );
}
const ProjectsPage = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default Projects;