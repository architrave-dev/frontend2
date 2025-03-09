import React from 'react';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { LeftModalFrame } from '../index/Indexing';
import SimpleWorkListForDetail from './SimpleWorkListForDetail';
import { WorkImportComp, WorkImportTitle } from './WorkImport';


const WorkListForDetail: React.FC = () => {
  const { project } = useProjectDetail();
  const { isClosing } = useModalStore();

  if (!project) return null;


  return (
    <LeftModalFrame
      onClick={(e) => e.stopPropagation()}
      $isClosing={isClosing}
    >
      <WorkImportComp>
        <WorkImportTitle>Select Work for Detail</WorkImportTitle>
        <SimpleWorkListForDetail />
      </WorkImportComp>
    </LeftModalFrame>
  );
};


export default WorkListForDetail;