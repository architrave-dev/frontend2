import React from 'react';
import styled from 'styled-components';

interface ColumnInfoProps {
}

const ColumnInfo: React.FC<ColumnInfoProps> = () => {

  return (
    <ColumnInfoComp>
      <InfoContainer>
        <TitleBlock>Title</TitleBlock>
        <SizeBlock>Size(cm)</SizeBlock>
        <MaterialBlock>Material</MaterialBlock>
        <ProdYearBlock>Year</ProdYearBlock>
        <DescriptionBlock>Description</DescriptionBlock>
        <PriceBlock>Price($)</PriceBlock>
        <CollectionBlock>Collection</CollectionBlock>
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
  flex: 3.5;

  display: flex;
  align-items: center;

  // background-color: #ffedbf;
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

const DescriptionBlock = styled.div`
  flex: 2;
  
  display: flex;
  align-items: center;
  justify-content: center;

  // background-color: #ffedbf;
`

const PriceBlock = styled.div`
  flex: 1.2;
  
  display: flex;
  align-items: center;
  justify-content: center;

  // background-color: #ffcd74;
`
const CollectionBlock = styled.div`
  flex: 1.2;
  
  display: flex;
  align-items: center;
  justify-content: center;

  // background-color: #ffcd74;
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