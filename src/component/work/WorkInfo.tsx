import React from 'react';
import styled from 'styled-components';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../shared/store/WorkViewStore';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import { AlertPosition, AlertType } from '../../shared/enum/EnumRepository';
import { WorkData, convertSizeToString } from '../../shared/dto/EntityRepository';

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
        <TitleBlock>{data.title}</TitleBlock>
        <SizeBlock>{convertSizeToString(data.size)}</SizeBlock>
        <MaterialBlock>{data.material === '' ? '-' : data.material}</MaterialBlock>
        <ProdYearBlock>{data.prodYear}</ProdYearBlock>
        <DescriptionBlock>{data.description === '' ? '-' : data.description}</DescriptionBlock>
        <PriceBlock>{data.price === "" ? "-" : data.price}</PriceBlock>
        <CollectionBlock>{data.collection === "" ? "-" : data.collection}</CollectionBlock>
        <SpaceBlock />
      </ContentWrapper>
      {isActive && <ArrowBlock>{"----->"}</ArrowBlock>}
    </WorkInfoComp>
  )
}

const WorkInfoComp = styled.article`
  width: 100%;
  height: fit-content;

  position: relative;
  display: flex;
  cursor: pointer;
  
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_2};
`;

const ContentWrapper = styled.div<{ $isActive: boolean }>`
  display: flex;
  width: 100%;
  height: 40px;
  opacity: ${props => props.$isActive ? 0.5 : 1};
`;

const ArrowBlock = styled.div`
  position: absolute;
  top: 0;
  right: 1vw;
  
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  white-space: nowrap;
  overflow: hidden;
  pointer-events: none;
`

const TitleBlock = styled.div`
  flex: 3.5;

  display: flex;
  align-items: center;

  border-bottom: 0.5px solid ${({ theme }) => theme.colors.color_Gray_04};
  // background-color: #ffcd74;
`

const SizeBlock = styled.div`
  flex: 1.5;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 0.5px solid ${({ theme }) => theme.colors.color_Gray_04};
  // background-color: #ffedbf;
`

const MaterialBlock = styled.div`
  flex: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 0.5px solid ${({ theme }) => theme.colors.color_Gray_04};
  // background-color: #ffcd74;
`

const ProdYearBlock = styled.div`
  flex: 0.5;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 0.5px solid ${({ theme }) => theme.colors.color_Gray_04};
  // background-color: #ffedbf;
`

const DescriptionBlock = styled.div`
  flex: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.color_Gray_04};
  // background-color: #ffcd74;
`
const PriceBlock = styled.div`
  flex: 1.2;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 0.5px solid ${({ theme }) => theme.colors.color_Gray_04};
  // background-color: #ffedbf;
`
const CollectionBlock = styled.div`
  flex: 1.2;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 0.5px solid ${({ theme }) => theme.colors.color_Gray_04};
  // background-color: #ffcd74;
`
const SpaceBlock = styled.div`
  flex: 0.5;
  
  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid ${({ theme }) => theme.colors.color_White};
`

export default WorkInfo;