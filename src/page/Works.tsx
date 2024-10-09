import React from 'react';
import styled from 'styled-components';
import WorkList from '../component/work/WorkList';
import WorkViewer from '../component/work/WorkViewer';
import { useInitializePage } from '../shared/hooks/useInitializePage';

const Works: React.FC = () => {
  useInitializePage();

  return (
    <WorkContainer>
      <WorkList />
      <WorkViewer />
    </WorkContainer>
  );
}

export default Works;


const WorkContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;