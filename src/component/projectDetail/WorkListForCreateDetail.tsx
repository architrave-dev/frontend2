import React from 'react';
import styled from 'styled-components';
import { useWorkStationStore } from '../../shared/store/workStationStore';
import SimpleWork from './SimpleWork';
import { useAui } from '../../shared/hooks/useAui';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { peDetailBuilder } from '../../shared/converter/entityBuilder';

const WorkListForDetail: React.FC = () => {
  const { aui } = useAui();
  const { project } = useProjectDetail();
  const { createProjectElement } = useProjectElement();
  const { simpleList } = useWorkStationStore();
  const { clearModal } = useModalStore();

  if (!project) return null;

  const createDetailWithWork = async (workId: string) => {
    const createPe = async () => {
      try {
        const newElement = peDetailBuilder(project.id, workId);
        await createProjectElement(aui, newElement)
      } catch (err) {
      } finally {
        clearModal();
      }
    }
    createPe();
  };


  return (
    <WorkImportComp>
      {simpleList.length === 0 ?
        <NoWorkContainer>
          Work does not exist.<br />
          Create Work First.
        </NoWorkContainer>
        : <WorkImportTitle>Select Work for Detail</WorkImportTitle>
      }
      {simpleList.map((sw, i) =>
        <SimpleWork
          key={sw.simpleWork.title + i}
          data={sw.simpleWork}
          onClickHandler={createDetailWithWork} />
      )}
    </WorkImportComp>
  );
};

const WorkImportComp = styled.div`
  width: 100%;
  height: 500px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`

const NoWorkContainer = styled.div`
  width: 100%;
  height: 95%;
  
  display: flex;
  justify-content: center;
  align-items: center;
`

const WorkImportTitle = styled.div`
  ${({ theme }) => theme.typography.Body_02_1};
`

export default WorkListForDetail;