import React from 'react';
import styled from 'styled-components';

interface ColumnInfoProps {
}

const ColumnInfo: React.FC<ColumnInfoProps> = () => {

  return (
    <ColumnInfoComp>
      <ThumbnailBlock>Image</ThumbnailBlock>
      <TitleBlock>Title</TitleBlock>
      <SizeBlock>Size</SizeBlock>
      <MaterialBlock>Material</MaterialBlock>
      <ProdYearBlock>Year</ProdYearBlock>
      <DescriptionBlock>Description</DescriptionBlock>
      <PriceBlock>Price($)</PriceBlock>
    </ColumnInfoComp>
  )
}

const ColumnInfoComp = styled.article`
  width: 100%;
  height: fit-content;
  display: flex;

  ${({ theme }) => theme.typography.Body_03_1};
`;

const ThumbnailBlock = styled.div`
  width: 160px;

  display: flex;
  align-items: center;
  justify-content: center;
  
  background-color: #ffcd74;
  `
const TitleBlock = styled.div`
  width: 200px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffedbf;
  `

const SizeBlock = styled.div`
  width: 120px;

  display: flex;
  align-items: center;
  justify-content: center;
  
  background-color: #ffcd74;
`

const MaterialBlock = styled.div`
  width: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffedbf;
  `

const ProdYearBlock = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffcd74;
`

const DescriptionBlock = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffedbf;
`

const PriceBlock = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffcd74;
`


export default ColumnInfo;