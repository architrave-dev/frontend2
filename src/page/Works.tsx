import React from 'react';
import styled from 'styled-components';
import WorkList from '../component/work/WorkList';
import { useInitPage } from '../shared/hooks/useInitPage';
import SortStation from '../component/work/SortStation';
import ColumnInfo from '../component/work/ColumnInfo';

const Works: React.FC = () => {
  useInitPage();


  return (
    <WorkContainer>
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