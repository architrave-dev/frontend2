import React from 'react';
import styled from 'styled-components';
import { useWorkViewStore } from '../../shared/store/WorkViewStore';
import { WorkType } from '../../shared/enum/EnumRepository';
import { WorkData, convertSizeToString } from '../../shared/dto/EntityRepository';
import { useWorkPropertyVisible } from '../../shared/hooks/useApi/useWorkPropertyVisible';
import BlockWithVisible from './BlockWithVisible';


interface WorkInfoProps {
  data: WorkData;
  isSelected: boolean;
  handleClick: () => void
}

const WorkInfo: React.FC<WorkInfoProps> = ({ data, handleClick }) => {
  const { activeWork } = useWorkViewStore();
  const { workPropertyVisible } = useWorkPropertyVisible();

  if (!data || !workPropertyVisible) return null;

  const isActive: boolean = !!activeWork && activeWork.id === data.id;

  return (
    <WorkInfoComp onClick={handleClick}>
      <ContentWrapper $isActive={isActive}>
        <TitleBlock>{data.title}</TitleBlock>
        <BlockWithVisible
          width={"1.5"}
          value={convertSizeToString(data.size)} />
        <BlockWithVisible
          width={"2"}
          value={data.material === '' ? '-' : data.material} />
        <BlockWithVisible
          width={"0.8"}
          value={data.prodYear} />
        <BlockWithVisible
          width={"1.2"}
          field={"workType"}
          value={data.workType === WorkType.NONE ? '-' : data.workType} />
        <BlockWithVisible
          width={"1.2"}
          field={"price"}
          value={data.price === "" ? "-" : data.price} />
        <BlockWithVisible
          width={"1.2"}
          field={"collection"}
          value={data.collection === "" ? "-" : data.collection} />
        <BlockWithVisible
          width={"1.5"}
          field={"description"}
          value={data.description === '' ? '-' : data.description} />
        {activeWork && <SpaceBlock />}
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
  flex: 2.5;

  display: flex;
  align-items: center;

  border-bottom: 0.5px solid ${({ theme }) => theme.colors.color_Gray_04};
`

const SpaceBlock = styled.div`
  flex: 0.5;
  
  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid ${({ theme }) => theme.colors.color_White};
`

export default WorkInfo;