import React from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import { useWorkStationStore } from '../../shared/store/workStationStore';
import WorkDetailImport from './SimpleWorkDetailList';
import { useWorkDetail } from '../../shared/hooks/useApi/useWorkDetail';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { SmallestBtn } from '../../shared/component/headless/button/BtnBody';
import SimpleWork from './SimpleWork';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { peWorkImportBuilder } from '../../shared/converter/entityBuilder';


const WorkImport: React.FC = () => {
  const { aui } = useAui();
  const { clearModal } = useModalStore();
  const { project } = useProjectDetail();
  const { simpleList } = useWorkStationStore();
  const { createProjectElementWithWork, projectElementList } = useProjectElement();
  const { getSimpleWorkDetailList } = useWorkDetail();

  if (!project) return null;
  if (simpleList.length === 0) return (
    <NoWorkContainer onClick={clearModal}>
      Work does not exist.
    </NoWorkContainer>
  );

  const onClickHandler = async (workId: string) => {
    try {
      const newIndex = projectElementList.length;
      await createProjectElementWithWork(aui, peWorkImportBuilder(project.id, workId, newIndex));
    } catch (err) {
    }
    clearModal();
  };

  const onClickDetailHandler = async (workId: string) => {
    await getSimpleWorkDetailList(aui, workId);
  };


  return (
    <SimpleWorkContainer>
      {simpleList.map((sw, i) =>
        <React.Fragment key={sw.simpleWork.id}>
          <SimpleWork
            data={sw.simpleWork}
            onClickHandler={onClickHandler} />
          {sw.simpleWorkDetail.length > 0 ?
            <WorkDetailImport simpleWorkDetailList={sw.simpleWorkDetail} />
            :
            <HeadlessBtn
              value={"Details"}
              handleClick={() => onClickDetailHandler(sw.simpleWork.id)}
              StyledBtn={SmallestBtn}
            />
          }
        </React.Fragment>
      )}
    </SimpleWorkContainer>
  );
};

const NoWorkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  height: 500px;
`

const SimpleWorkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
  
  width: 100%;
  height: 500px;
  
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default WorkImport;