import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

export interface WorkProps {
  image: string;
  title: string;
  description: string;
}

const Work2: React.FC<WorkProps> = ({ image, title, description }) => {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const updateImageDimensions = () => {
      if (imageRef.current) {
        setImageDimensions({
          width: imageRef.current.naturalWidth,
          height: imageRef.current.naturalHeight,
        });
      }
    };

    const img = imageRef.current;
    if (img) {
      if (img.complete) {
        updateImageDimensions();
      } else {
        img.onload = updateImageDimensions;
      }
    }

    return () => {
      if (img) img.onload = null;
    };
  }, [image]);

  return (
    <WorkWrapper>
      <WorkImage
        ref={imageRef}
        src={image}
        alt={title}
        $naturalWidth={imageDimensions.width}
        $naturalHeight={imageDimensions.height} />
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
  margin-bottom: 20px;
`;

const WorkImage = styled.img<{ $naturalWidth: number; $naturalHeight: number }>`
max-width: 100%;
max-height: 90vh;
width: ${props =>
    props.$naturalWidth > props.$naturalHeight ? '100%' : 'auto'};
height: ${props =>
    props.$naturalWidth > props.$naturalHeight ? 'auto' : '100vh'};
object-fit: contain;
margin-bottom: 16px;

@media (max-aspect-ratio: 1/1) {
  width: 100%;
  height: auto;
  max-height: none;
}
`;

const WorkTitle = styled.h2`
  width: 100%;
  padding: 0 calc(10vw);
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  text-align: center;
  ${({ theme }) => theme.typography.Body_03_2};
`;

const WorkDescription = styled.p`
  width: 100%;
  padding: 0 calc(10vw);
  color: ${({ theme }) => theme.colors.color_Gray_04};
  text-align: center;
  ${({ theme }) => theme.typography.Body_04};
`;


export default Work2;
