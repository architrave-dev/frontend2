import React from 'react';
import styled from 'styled-components';
import { WorkData } from '../../shared/store/WorkListStore';
import { convertSizeToString } from '../../shared/store/projectElementStore';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../shared/store/WorkViewStore';
import { useEditMode } from '../../shared/hooks/useEditMode';
import defaultImg from '../../asset/project/default_1.png';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import { AlertPosition, AlertType } from '../../shared/enum/EnumRepository';

interface WorkInfoProps {
  data: WorkData;
}

const WorkInfo: React.FC<WorkInfoProps> = ({ data }) => {
  const { isEditMode } = useEditMode();
  const { activeWork, setActiveWork } = useWorkViewStore();
  const { setUpdatedActiveWork } = useWorkViewStoreForUpdate();
  const { setStandardAlert } = useStandardAlertStore();

  const handleClick = () => {
    if (isEditMode) {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "Exit edit mode."
      })
      return;
    }
    setActiveWork(data);
    setUpdatedActiveWork(data);
  }

  if (!data) return null;

  const isActive: boolean = !!activeWork && activeWork.id === data.id;

  return (
    <WorkInfoComp onClick={handleClick}>
      <ContentWrapper $isActive={isActive}>
        <ThumbnailBlock>
          <WorkImage src={data.thumbnailUrl === '' ? defaultImg : data.thumbnailUrl} alt={data.title} />
        </ThumbnailBlock>
        <TitleBlock>{data.title}</TitleBlock>
        <SizeBlock>{convertSizeToString(data.size)}</SizeBlock>
        <MaterialBlock>{data.material}</MaterialBlock>
        <ProdYearBlock>{data.prodYear}</ProdYearBlock>
        <DescriptionBlock>{data.description}</DescriptionBlock>
        <PriceBlock>-</PriceBlock>
      </ContentWrapper>
      {isActive && <ArrowBlock>{"--------------------------------------------------->"}</ArrowBlock>}
    </WorkInfoComp>
  )
}

const WorkInfoComp = styled.article`
  width: 100%;
  height: fit-content;

  position: relative;
  display: flex;
  cursor: pointer;
  
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_2};
`;

const ContentWrapper = styled.div<{ $isActive: boolean }>`
  display: flex;
  width: 100%;
  opacity: ${props => props.$isActive ? 0.5 : 1};
`;

const ArrowBlock = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  white-space: nowrap;
  overflow: hidden;
  pointer-events: none;
`
const WorkImage = styled.img`
  max-width: 100%;
  max-height: 60px;
  object-fit: contain;
`;

const ThumbnailBlock = styled.div`
  width: 160px;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffedbf;
  `

const TitleBlock = styled.div`
  width: 200px;

  display: flex;
  align-items: center;

  background-color: #ffcd74;
`

const SizeBlock = styled.div`
  width: 120px;

  display: flex;
  align-items: center;

  background-color: #ffedbf;
`

const MaterialBlock = styled.div`
  width: 100px;

  display: flex;
  align-items: center;

  background-color: #ffcd74;
`

const ProdYearBlock = styled.div`
  width: 50px;

  display: flex;
  align-items: center;

  background-color: #ffedbf;
`

const DescriptionBlock = styled.div`
  width: 200px;

  display: flex;
  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: #ffcd74;
`
const PriceBlock = styled.div`
  width: 80px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffedbf;
`

export default WorkInfo;