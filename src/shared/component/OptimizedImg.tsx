import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface ImageMetadata {
  MOBILE: boolean;
  TABLET: boolean;
  LAPTOP: boolean;
  DESKTOP: boolean;
}

const BREAKPOINTS = {
  MOBILE: 768,    // 0 - 768px
  TABLET: 1024,   // 769px - 1024px
  LAPTOP: 1440,   // 1025px - 1440px
  DESKTOP: 3840,  // 1440px - 3840px
};

const getDeviceType = (width: number): string => {
  if (width <= BREAKPOINTS.MOBILE) return 'MOBILE';
  if (width <= BREAKPOINTS.TABLET) return 'TABLET';
  if (width <= BREAKPOINTS.LAPTOP) return 'LAPTOP';
  if (width <= BREAKPOINTS.DESKTOP) return 'DESKTOP';
  return 'origin';
};

const getNextDeviceType = (currentType: string): string => {
  switch (currentType) {
    case 'MOBILE': return 'TABLET';
    case 'TABLET': return 'LAPTOP';
    case 'LAPTOP': return 'DESKTOP';
    case 'DESKTOP': return 'origin';
    default: return 'origin';
  }
};

const getFallbackDeviceType = (metadata: ImageMetadata, initialDeviceType: string): string => {
  let currentType = initialDeviceType;

  while (!metadata[currentType as keyof ImageMetadata] && currentType !== 'DESKTOP') {
    currentType = getNextDeviceType(currentType);
  }

  if (metadata[currentType as keyof ImageMetadata]) {
    return currentType;
  }

  currentType = initialDeviceType;
  while (!metadata[currentType as keyof ImageMetadata] && currentType !== 'MOBILE') {
    currentType = currentType === 'DESKTOP' ? 'LAPTOP' :
      currentType === 'LAPTOP' ? 'TABLET' : 'MOBILE';
  }

  return currentType;
};

interface OptimizedImgProps {
  imageUrl: string;
}

const OptimizedImg: React.FC<OptimizedImgProps> = ({ imageUrl }) => {
  const [browserType, setBrowserType] = useState(getDeviceType(window.innerWidth));
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [adjustedUrl, setAdjustedUrl] = useState(imageUrl);

  useEffect(() => {
    const handleResize = () => {
      const newDeviceType = getDeviceType(window.innerWidth);
      if (newDeviceType !== browserType) {
        setBrowserType(newDeviceType);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [browserType]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const jsonUrl = imageUrl.replace(/\/[^/]+\.(?:jpeg|jpg|png|gif)$/, '/meta.json');
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch metadata');
        }
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    if (imageUrl) {
      fetchMetadata();
    }
  }, [imageUrl]);

  useEffect(() => {
    if (imageUrl && metadata) {
      const finalDeviceType = getFallbackDeviceType(metadata, browserType);

      // Only adjust URL if we found a valid device type
      if (metadata[finalDeviceType as keyof ImageMetadata]) {
        const newUrl = imageUrl.replace(
          /\/([^/]+)\.(jpeg|jpg|png|gif)$/,
          `/${finalDeviceType}.$2`
        );
        setAdjustedUrl(newUrl);
      } else {
        setAdjustedUrl(imageUrl);
      }
    }
  }, [browserType, imageUrl, metadata]);

  return (
    <OptImg src={adjustedUrl} alt="Optimized Image" />
  );
};

export default OptimizedImg;


const OptImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
