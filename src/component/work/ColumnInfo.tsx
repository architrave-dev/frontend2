import React from 'react';
import styled from 'styled-components';

interface ColumnInfoProps {
}

const ColumnInfo: React.FC<ColumnInfoProps> = () => {

  return (
    <ColumnInfoComp>
      <TitleBlock>Title</TitleBlock>
      <SizeBlock>Size</SizeBlock>
      <MaterialBlock>Material</MaterialBlock>
      <ProdYearBlock>Year</ProdYearBlock>
      <DescriptionBlock>Description</DescriptionBlock>
    </ColumnInfoComp>
  )
}

const ColumnInfoComp = styled.article`
  width: 100%;
  height: fit-content;
  display: flex;

  ${({ theme }) => theme.typography.Body_03_1};
`;

const TitleBlock = styled.div`
  width: 200px;

  background-color: #ffedbf;
  `

const SizeBlock = styled.div`
  width: 120px;
  
  background-color: #ffcd74;
`

const MaterialBlock = styled.div`
  width: 100px;
  
  background-color: #ffedbf;
  `

const ProdYearBlock = styled.div`
  width: 50px;
  
  background-color: #ffcd74;
`

const DescriptionBlock = styled.div`
  width: 200px;

  background-color: #ffedbf;
`


export default ColumnInfo;