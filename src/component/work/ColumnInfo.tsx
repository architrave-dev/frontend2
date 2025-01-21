import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useWorkPropertyVisible } from '../../shared/hooks/useApi/useWorkPropertyVisible';
import { WorkPropertyVisibleData } from '../../shared/dto/EntityRepository';
import BlockWithVisible from './BlockWithVisible';
import { useWorkViewStore } from '../../shared/store/WorkViewStore';


const ColumnInfo: React.FC = () => {
  const { aui } = useAui();
  const { isEditMode } = useEditMode();
  const { workPropertyVisible, getWorkPropertyVisible, updateWorkPropertyVisible } = useWorkPropertyVisible();
  const { activeWork } = useWorkViewStore();

  useEffect(() => {
    const getWorkPropertyVisibleWithApi = async () => {
      if (!aui) return;
      try {
        console.log("getting workPropertyVisible...");
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

  return (
    <ColumnInfoComp>
      <InfoContainer>
        <TitleBlock>Title</TitleBlock>
        <BlockWithVisible
          width={"1.5"}
          isColumn={true}
          field={'workType'}
          value={"Type"}
          doubleClickHandler={() => handleDoubleClick('workType')}
        />
        <BlockWithVisible
          width={"1.5"}
          isColumn={true}
          value={"Size(cm)"}
        />
        <BlockWithVisible
          width={"2"}
          isColumn={true}
          value={"Material"}
        />
        <BlockWithVisible
          width={"0.8"}
          isColumn={true}
          value={"Year"}
        />
        <BlockWithVisible
          width={"1.5"}
          isColumn={true}
          field={'description'}
          value={"Description"}
          doubleClickHandler={() => handleDoubleClick('description')}
        />
        <BlockWithVisible
          width={"1.2"}
          isColumn={true}
          field={'price'}
          value={"Price($)"}
          doubleClickHandler={() => handleDoubleClick('price')}
        />
        <BlockWithVisible
          width={"1.2"}
          isColumn={true}
          field={'collection'}
          value={"Collection"}
          doubleClickHandler={() => handleDoubleClick('collection')}
        />
        {activeWork && <SpaceBlock />}
      </InfoContainer>
      {activeWork &&
        <OverviewBlock>Overview</OverviewBlock>
      }
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
`


export default ColumnInfo;