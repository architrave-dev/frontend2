import React from 'react';
import styled from 'styled-components';
import WorkList from '../component/work/WorkList';
import { useInitPage } from '../shared/hooks/useInitPage';
import SortStation from '../component/work/SortStation';
import ColumnInfo from '../component/work/ColumnInfo';
import { useLoadingStore } from '../shared/store/loadingStore';
import Loading from '../shared/component/Loading';

const Works: React.FC = () => {
  useInitPage();
  const { isLoading } = useLoadingStore();

  return (
    <WorkContainer>
      <Loading isLoading={isLoading} />
      <SortStation />
      <ColumnInfo />
      <WorkList />
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