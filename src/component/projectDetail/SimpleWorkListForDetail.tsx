import React from 'react';
import { useAui } from '../../shared/hooks/useAui';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import { useWorkStationStore } from '../../shared/store/workStationStore';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { peDetailBuilder } from '../../shared/converter/entityBuilder';
import { NoWorkContainer, SimpleWorkContainer } from './SimpleWorkList';
import SimpleWork from './SimpleWork';


const WorkImport: React.FC = () => {
  const { aui } = useAui();
  const { clearModal } = useModalStore();
  const { project } = useProjectDetail();
  const { simpleList } = useWorkStationStore();
  const { createProjectElement, projectElementList } = useProjectElement();

  if (!project) return null;
  if (simpleList.length === 0) return (
    <NoWorkContainer onClick={clearModal}>
      Work does not exist.<br />
      Create Work First.
    </NoWorkContainer>
  );

  const createDetailWithWork = async (workId: string) => {
    const newIndex = projectElementList.length;
    const newElement = peDetailBuilder(project.id, workId, newIndex);
    await createProjectElement(aui, newElement)

    clearModal();
  };


  return (
    <SimpleWorkContainer>
      {simpleList.map((sw, i) =>
        <SimpleWork
          key={sw.simpleWork.title + i}
          data={sw.simpleWork}
          onClickHandler={createDetailWithWork} />
      )}
    </SimpleWorkContainer>
  );
};


export default WorkImport;