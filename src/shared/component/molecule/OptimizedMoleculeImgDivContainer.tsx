import React, { useRef, useState, useEffect } from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import ReplaceImageButton from '../ReplaceImageButton';
import { StyledImgDivContainerProps } from '../../dto/StyleCompRepository';
import defaultImg from '../../../asset/project/default_1.png'
import { ImageMetadata } from '../../dto/EntityRepository';
import { isBase64, getFallbackDeviceType, convertToJsonMetadata } from '../../util/findAdjustImg';

interface OptimizedMoleculeImgDivContainerProps {
  backgroundImg: string;
  handleChange?: (originUrl: string) => void;
  StyledImgDivContainer: React.ComponentType<StyledImgDivContainerProps>;
  children?: React.ReactNode;
}

const OptimizedMoleculeImgDivContainer: React.FC<OptimizedMoleculeImgDivContainerProps> = ({
  backgroundImg,
  handleChange,
  StyledImgDivContainer,
  children
}) => {
  const { isEditMode } = useEditMode();
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [browserType, setBrowserType] = useState<string | null>(null);
  const [adjustedUrl, setAdjustedUrl] = useState(backgroundImg);
  const currentDeviceTypeRef = useRef<string | null>(null);


  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const timestamp = Date.now();
        const jsonUrl = backgroundImg.replace(/\/[^/]+\.(?:jpeg|jpg|png|gif)$/, `/meta.json?ts=${timestamp}`);
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch metadata');
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          const booleanMetadata = convertToJsonMetadata(data)

          setMetadata(booleanMetadata);
        } else {
          throw new Error('Response is not JSON');
        }
      } catch (error) {
      }
    };

    if (backgroundImg && !isBase64(backgroundImg)) {
      fetchMetadata();
    }
  }, [backgroundImg]);

  useEffect(() => {
    if (backgroundImg && metadata) {
      const handleResize = () => {
        if (isBase64(backgroundImg)) {
          return;
        }
        const newDeviceType = getFallbackDeviceType(metadata, window.innerWidth);
        if (currentDeviceTypeRef.current !== newDeviceType) {
          console.log("Crossed breakpoint, =>", newDeviceType);
          setBrowserType(newDeviceType);
          currentDeviceTypeRef.current = newDeviceType;
        }

      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [metadata, backgroundImg]);


  useEffect(() => {
    if (isBase64(backgroundImg)) {
      setAdjustedUrl(backgroundImg);
      return;
    }
    if (backgroundImg && metadata) {
      // Only adjust URL if we found a valid device type
      if (metadata[browserType as keyof ImageMetadata]) {
        const newUrl = backgroundImg.replace(
          /\/([^/]+)\.(jpeg|jpg|png|gif)$/,
          `/${browserType}.$2`
        );
        setAdjustedUrl(newUrl);
      } else {
        setAdjustedUrl(backgroundImg);
      }
    }
  }, [browserType, backgroundImg]);

  return (
    <StyledImgDivContainer $backgroundImg={backgroundImg === '' ? defaultImg : adjustedUrl}>
      {handleChange && isEditMode && (
        <ReplaceImageButton imgSrc={backgroundImg} setImageUrl={handleChange} />
      )}
      {children}
    </StyledImgDivContainer>
  );
}


export default OptimizedMoleculeImgDivContainer;
