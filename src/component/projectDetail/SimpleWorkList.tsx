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


const WorkImport: React.FC = () => {
  const { aui } = useAui();
  const { closeModal } = useModal();
  const { project } = useProjectDetail();
  const { simpleWorkList } = useWorkStationStore();
  const { createProjectElementWithWork } = useProjectElement();

  if (!project) return null;
  if (simpleWorkList.length === 0) return (
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

  return (
    <SimpleWorkContainer>
      {simpleWorkList.map((sw) =>
        <SimpleWork key={sw.id} onClick={() => onClickHandler(sw.id)}>
          <ImgWrapper>
            <WorkImage src={sw.thumbnailUrl === '' ? defaultImg : convertS3UrlToCloudFrontUrl(sw.thumbnailUrl)} alt={sw.title} />
          </ImgWrapper>
          <SimpleDiv>{sw.title}</SimpleDiv>
        </SimpleWork>
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
  gap: 20px;
  
  width: 100%;
  height: 500px;
  
  overflow-y: scroll;
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