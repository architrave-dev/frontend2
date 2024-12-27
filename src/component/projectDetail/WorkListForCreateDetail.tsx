import React from 'react';
import styled from 'styled-components';
import { useWorkStationStore } from '../../shared/store/workStationStore';
import SimpleWork from './SimpleWork';
import { useAui } from '../../shared/hooks/useAui';
import { CreateProjectElementReq } from '../../shared/dto/ReqDtoRepository';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { DisplayAlignment, ProjectElementType, WorkDisplaySize } from '../../shared/enum/EnumRepository';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import { useModal } from '../../shared/hooks/useModal';

const WorkListForDetail: React.FC = () => {
  const { aui } = useAui();
  const { project } = useProjectDetail();
  const { createProjectElement } = useProjectElement();
  const { simpleList } = useWorkStationStore();
  const { closeModal } = useModal();

  if (!project) return null;

  const createDetailWithWork = async (workId: string) => {
    const createPe = async () => {
      try {
        const newElement: CreateProjectElementReq = {
          tempId: Math.floor(Math.random() * 100) + "",
          projectId: project.id,
          projectElementType: ProjectElementType.DETAIL,
          createWorkReq: null,
          workAlignment: null,
          workDisplaySize: null,
          // WorkDetail
          createWorkDetailReq: {
            workId: workId,
            originUrl: '',
            thumbnailUrl: '',
            description: "",
          },
          workDetailAlignment: DisplayAlignment.CENTER,
          workDetailDisplaySize: WorkDisplaySize.BIG,
          createTextBoxReq: null,
          textBoxAlignment: null,
          createDocumentReq: null,
          documentAlignment: null,
          dividerType: null
        };
        await createProjectElement(aui, newElement)
      } catch (err) {
      } finally {
        closeModal();
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