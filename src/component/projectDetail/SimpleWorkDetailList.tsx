import React from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import defaultImg from '../../asset/project/default_1.png'
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';
import { WorkDetailSimpleData } from '../../shared/dto/EntityRepository';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { peDetailImportBuilder } from '../../shared/converter/EntityBuilder';

interface WorkDetailImportProps {
  simpleWorkDetailList: WorkDetailSimpleData[];
}

const WorkDetailImport: React.FC<WorkDetailImportProps> = ({ simpleWorkDetailList }) => {
  const { aui } = useAui();
  const { clearModal } = useModalStore();
  const { project } = useProjectDetail();
  const { createProjectElementWithWorkDetail } = useProjectElement();

  if (!project) return null;
  if (simpleWorkDetailList.length === 0) return null;


  const onClickHandler = async (workDetailId: string) => {
    try {
      await createProjectElementWithWorkDetail(aui, peDetailImportBuilder(project.id, workDetailId));
    } catch (err) {
    }
    clearModal();
  };

  return (
    <>
      {simpleWorkDetailList.map((sw) =>
        <SimpleWork key={sw.id} onClick={() => onClickHandler(sw.id)}>
          <ImgWrapper>
            <WorkImage src={sw.thumbnailUrl === '' ? defaultImg : convertS3UrlToCloudFrontUrl(sw.thumbnailUrl)} alt="work detail" />
          </ImgWrapper>
        </SimpleWork>
      )}
    </>
  );
};

const SimpleWork = styled.div`
  width: 70%;
  height: fit-content;
  display: flex;
  flex-direction: column;

  cursor: pointer;
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

export default WorkDetailImport;