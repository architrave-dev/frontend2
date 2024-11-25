import React from 'react';
import styled from 'styled-components';
import SimpleWorkList from './SimpleWorkList';

const WorkImport: React.FC = () => {

  return (
    <WorkImportComp>
      <WorkImportTitle>Select Work</WorkImportTitle>
      <SimpleWorkList />
    </WorkImportComp>
  );
};

const WorkImportComp = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
`
const WorkImportTitle = styled.div`
  ${({ theme }) => theme.typography.Body_02_1};
`


export default WorkImport;