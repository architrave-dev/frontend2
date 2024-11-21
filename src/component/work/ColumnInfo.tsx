import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useWorkPropertyVisible } from '../../shared/hooks/useApi/useWorkPropertyVisible';
import { WorkPropertyVisibleData } from '../../shared/dto/EntityRepository';

interface ColumnInfoProps {
}

const ColumnInfo: React.FC<ColumnInfoProps> = () => {
  const { aui } = useAui();
  const { isEditMode } = useEditMode();
  const { workPropertyVisible, getWorkPropertyVisible, updateWorkPropertyVisible } = useWorkPropertyVisible();

  useEffect(() => {
    const getWorkPropertyVisibleWithApi = async () => {
      if (!aui) return;
      try {
        console.log("getting billboard...");
        await getWorkPropertyVisible(aui);
      } catch (error) { }
    }
    getWorkPropertyVisibleWithApi();
  }, [aui]);

  if (!workPropertyVisible) return null;

  const handleDoubleClick = async (field: keyof WorkPropertyVisibleData) => {
    if (!isEditMode) return null;
    try {
      await updateWorkPropertyVisible(aui, {
        ...workPropertyVisible,
        [field]: !workPropertyVisible[field]
      });
    } catch (err) {
    } finally {
    }
  };

  const renderCondition = (field: keyof WorkPropertyVisibleData) => {
    if (!isEditMode && !workPropertyVisible[field]) // edit 모드가 아닌데 visible이 false면 안보여야해
      return false;
    else
      return true;
  }

  return (
    <ColumnInfoComp>
      <InfoContainer>
        <TitleBlock>Title</TitleBlock>
        {renderCondition('workType') &&
          <WorkTypeBlock
            $isVisible={workPropertyVisible.workType}
            onDoubleClick={() => handleDoubleClick('workType')}>Type</WorkTypeBlock>
        }
        <SizeBlock>Size(cm)</SizeBlock>
        <MaterialBlock>Material</MaterialBlock>
        <ProdYearBlock>Year</ProdYearBlock>
        {renderCondition('description') &&
          <DescriptionBlock
            $isVisible={workPropertyVisible.description}
            onDoubleClick={() => handleDoubleClick('description')}>Description</DescriptionBlock>
        }
        {renderCondition('price') &&
          <PriceBlock
            $isVisible={workPropertyVisible.price}
            onDoubleClick={() => handleDoubleClick('price')}>Price($)</PriceBlock>
        }
        {renderCondition('collection') &&
          <CollectionBlock
            $isVisible={workPropertyVisible.collection}
            onDoubleClick={() => handleDoubleClick('collection')} >Collection</CollectionBlock>
        }
        <SpaceBlock />
      </InfoContainer>
      <OverviewBlock>Overview</OverviewBlock>
    </ColumnInfoComp>
  )
}

const ColumnInfoComp = styled.article`
  width: 100%;
  height: 52px;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_02};

  ${({ theme }) => theme.typography.Body_02_1};
`;

const InfoContainer = styled.article`
  width: 100%;
  height: 48px;
  display: flex;
`;

const TitleBlock = styled.div`
  flex: 2.5;

  display: flex;
  align-items: center;

  // background-color: #ffedbf;
  `

const WorkTypeBlock = styled.div<{ $isVisible: boolean }>`
  flex: 1.5;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0.5)};
  `

const SizeBlock = styled.div`
  flex: 1.5;

  display: flex;
  align-items: center;
  justify-content: center;
  
  // background-color: #ffcd74;
`

const MaterialBlock = styled.div`
  flex: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  // background-color: #ffedbf;
  `

const ProdYearBlock = styled.div`
  flex: 0.5;

  display: flex;
  align-items: center;
  justify-content: center;

  // background-color: #ffcd74;
`

const DescriptionBlock = styled.div<{ $isVisible: boolean }>`
  flex: 2;
  
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0.5)};

`

const PriceBlock = styled.div<{ $isVisible: boolean }>`
  flex: 1.2;
  
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0.5)};

`
const CollectionBlock = styled.div<{ $isVisible: boolean }>`
  flex: 1.2;
  
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0.5)};
`

const SpaceBlock = styled.div`
  flex: 0.5;
  
  display: flex;
  align-items: center;
  justify-content: center;
`

const OverviewBlock = styled.div`
  width: 35vw;
  // flex-grow: 10;
  display: flex;
  align-items: center;

  // background-color: #ffedbf;
`


export default ColumnInfo;