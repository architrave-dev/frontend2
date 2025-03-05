import React, { useState } from 'react';
import styled from 'styled-components';
import { IndexOrderData } from '../../shared/dto/EntityRepository';
import { shrinkString } from '../../shared/util/shrinkString';

interface IndexCardProps {
  data: IndexOrderData;
  onDragStart: (data: IndexOrderData) => void;
}
const MAX_MAIN_TEXT_LENGTH = 15;

const IndexCard: React.FC<IndexCardProps> = ({
  data,
  onDragStart
}) => {

  return (
    <IndexCardComp
      draggable={true}
      onDragStart={() => onDragStart(data)}
    >
      <HandleIcon>::</HandleIcon>

      <TextContainer>
        <MainText>{shrinkString(data.mainText, MAX_MAIN_TEXT_LENGTH)}</MainText>
        <SubText>{data.subText}</SubText>
      </TextContainer>
    </IndexCardComp>
  );
};


const IndexCardComp = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: 0.5rem;

  border: 1px solid ${({ theme }) => theme.colors.color_Gray_03};
  border-radius: 1px;
  backdrop-filter: blur(10px);
  background-color: transparent;
  transition: all 0.2s ease-out;

  &:hover {
    transform: scale(1.05);  
    background-color: ${({ theme }) => theme.colors.color_Alpha_03};
  }

  cursor: grab;
  user-select: none;
  &:active {
    cursor: grabbing;
  }
`

const HandleIcon = styled.div`
  font-size: 16px;
  font-weight: 600;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  gap: 2px;
`
const MainText = styled.div`
  ${({ theme }) => theme.typography.Body_03_1};
`
const SubText = styled.div`
  ${({ theme }) => theme.typography.Body_04};
  color: ${({ theme }) => theme.colors.color_Gray_05};
`

export default IndexCard;