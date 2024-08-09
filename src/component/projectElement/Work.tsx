import React, { useState, useRef } from 'react';
import styled from 'styled-components';

export interface WorkProps {
  image: string;
  title: string;
  description: string;
}

const Work: React.FC<WorkProps> = ({ image, title, description }) => {
  return (
    <WorkWrapper>
      <WorkImage src={image} alt={title} />
      <WorkTitle>[{title}]</WorkTitle>
      <WorkDescription>{description}</WorkDescription>
    </WorkWrapper>
  );
};

const WorkWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WorkImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  margin-bottom: 16px;
  object-fit: contain;
`;

const WorkTitle = styled.h2`
  width: 100%;
  padding: 0 calc(10vw);
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-align: center;
`;

const WorkDescription = styled.p`
  width: 100%;
  padding: 0 calc(10vw);
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-align: center;
`;


export default Work;
