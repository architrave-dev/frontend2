import React from 'react';
import styled from 'styled-components';
import WorkList from '../component/work/WorkList';
import { useInitPage } from '../shared/hooks/useInitPage';
import SortStation from '../component/work/SortStation';
import ColumnInfo from '../component/work/ColumnInfo';
import { useLoadingStore } from '../shared/store/loadingStore';
import Loading from '../shared/component/Loading';
import PageAboutWork from '../component/work/PageAboutWork';
import { useShiftTab } from '../shared/hooks/useShiftTab';
import { useWorkViewStore } from '../shared/store/WorkViewStore';


const Works: React.FC = () => {
  useInitPage();
  const { isLoading } = useLoadingStore();
  const { handleShiftTabForEditMode } = useShiftTab();
  const { hasChanged } = useWorkViewStore();

  return (
    <WorkContainer
      onKeyDown={(e) => handleShiftTabForEditMode(e, hasChanged)}
      tabIndex={-1}>
      <Loading isLoading={isLoading} />
      <SortStation />
      <ColumnInfo />
      <WorkList />
      <PageAboutWork />
    </WorkContainer>
  );
}

export default Works;


const WorkContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  padding: 0 calc(6vw);
  margin: calc(8vh) 0;

  overflow: hidden;
`;