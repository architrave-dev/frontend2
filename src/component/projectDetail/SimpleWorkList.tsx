import React from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { DisplayAlignment, WorkDisplaySize } from '../../shared/enum/EnumRepository';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import { useWorkStationStore } from '../../shared/store/workStationStore';
import { useModal } from '../../shared/hooks/useModal';
import defaultImg from '../../asset/project/default_1.png'
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';
import WorkDetailImport from './SimpleWorkDetailList';
import { useWorkDetail } from '../../shared/hooks/useApi/useWorkDetail';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { SmallestBtn } from '../../shared/component/headless/button/BtnBody';


const WorkImport: React.FC = () => {
  const { aui } = useAui();
  const { closeModal } = useModal();
  const { project } = useProjectDetail();
  const { simpleList } = useWorkStationStore();
  const { createProjectElementWithWork } = useProjectElement();
  const { getSimpleWorkDetailList } = useWorkDetail();

  if (!project) return null;
  if (simpleList.length === 0) return (
    <NoWorkContainer onClick={closeModal}>
      Work does not exist.
    </NoWorkContainer>
  );


  const onClickHandler = async (workId: string) => {
    try {
      await createProjectElementWithWork(aui, {
        projectId: project.id,
        workId: workId,
        workAlignment: DisplayAlignment.CENTER, //default
        workDisplaySize: WorkDisplaySize.BIG    //default
      });
    } catch (err) {
    }
    closeModal();
  };

  const onClickDetailHandler = async (workId: string) => {
    try {
      await getSimpleWorkDetailList(aui, workId);
    } catch (err) {
    } finally {
    }
  };


  return (
    <SimpleWorkContainer>
      {simpleList.map((sw) =>
        <>
          <SimpleWork key={sw.simpleWork.id} onClick={() => onClickHandler(sw.simpleWork.id)}>
            <ImgWrapper>
              <WorkImage src={sw.simpleWork.thumbnailUrl === '' ? defaultImg : convertS3UrlToCloudFrontUrl(sw.simpleWork.thumbnailUrl)} alt={sw.simpleWork.title} />
            </ImgWrapper>
            <SimpleDiv>{sw.simpleWork.title}</SimpleDiv>
          </SimpleWork>
          {sw.simpleWorkDetail.length > 0 ?
            <WorkDetailImport simpleWorkDetailList={sw.simpleWorkDetail} />
            :
            <HeadlessBtn
              value={"Details"}
              handleClick={() => onClickDetailHandler(sw.simpleWork.id)}
              StyledBtn={SmallestBtn}
            />
          }
        </>
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

const SimpleWork = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;

  cursor: pointer;
`
const WorkImage = styled.img`
  //부모 크기에 맞춤
  width: 100%;
  height: 100%; 
  object-fit: contain;
`;

const SimpleDiv = styled.div`
text-align: right;
${({ theme }) => theme.typography.Body_03_2};
`

export default WorkImport;