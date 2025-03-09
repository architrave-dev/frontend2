import React from 'react';
import styled from 'styled-components';
import SimpleWorkList from './SimpleWorkList';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { LeftModalFrame } from '../index/Indexing';

const WorkImport: React.FC = () => {
  const { isClosing } = useModalStore();

  return (
    <LeftModalFrame
      onClick={(e) => e.stopPropagation()}
      $isClosing={isClosing}
    >
      <WorkImportComp>
        <WorkImportTitle>Select Work</WorkImportTitle>
        <SimpleWorkList />
      </WorkImportComp>
    </LeftModalFrame>
  );
};


export const WorkImportComp = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
`
export const WorkImportTitle = styled.div`
  ${({ theme }) => theme.typography.Body_02_1};
`


export default WorkImport;