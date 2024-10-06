import React from 'react';
import styled from 'styled-components';
import { WorkData } from '../../shared/store/WorkListStore';
import { convertSizeToString } from '../../shared/store/projectElementStore';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../shared/store/WorkViewStore';
import { useEditMode } from '../../shared/hooks/useEditMode';

interface WorkInfoProps {
  data: WorkData;
}

const WorkInfo: React.FC<WorkInfoProps> = ({ data }) => {
  const { isEditMode } = useEditMode();
  const { activeWork, setActiveWork } = useWorkViewStore();
  const { setUpdatedActiveWork } = useWorkViewStoreForUpdate();

  const handleClick = () => {
    if (isEditMode) {
      alert("Exit edit mode.");
      return;
    }
    setActiveWork(data);
    setUpdatedActiveWork(data);
  }

  if (!data) return null;
  return (
    <WorkInfoComp onClick={handleClick}>
      {activeWork && activeWork.id === data.id ?
        <ArrowBlock>{"--------------------------------------------------->"}</ArrowBlock> :
        <>
          <TitleBlock>{data.title}</TitleBlock>
          <SizeBlock>{convertSizeToString(data.size)}</SizeBlock>
          <MaterialBlock>{data.material}</MaterialBlock>
          <ProdYearBlock>{data.prodYear}</ProdYearBlock>
          <DescriptionBlock>{data.description}</DescriptionBlock>
        </>
      }
    </WorkInfoComp>
  )
}

const WorkInfoComp = styled.article`
  width: 100%;
  height: fit-content;
  display: flex;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_2};
`;

const ArrowBlock = styled.div`
  width: 670px;
  text-align: right;

  white-space: nowrap;
  overflow: hidden;
`

const TitleBlock = styled.div`
  width: 200px;

  background-color: #ffcd74;
`

const SizeBlock = styled.div`
  width: 120px;

  background-color: #ffedbf;
`

const MaterialBlock = styled.div`
  width: 100px;

  background-color: #ffcd74;
`

const ProdYearBlock = styled.div`
  width: 50px;

  background-color: #ffedbf;
`

const DescriptionBlock = styled.div`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: #ffcd74;
`


export default WorkInfo;