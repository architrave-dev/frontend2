import React, { useState, useEffect, useRef } from "react";
import { StyledImgProps } from '../dto/StyleCompRepository';
import { DisplaySize } from '../enum/EnumRepository';

interface ImageMetadata {
  MOBILE: boolean;
  TABLET: boolean;
  LAPTOP: boolean;
  DESKTOP: boolean;
  origin: boolean;
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

const getNextDeviceType = (currentType: string, metadata: ImageMetadata): string => {
  const deviceOrder = ['MOBILE', 'TABLET', 'LAPTOP', 'DESKTOP', 'origin'];
  const currentIndex = deviceOrder.indexOf(currentType);

  for (let i = currentIndex + 1; i < deviceOrder.length; i++) {
    const nextType = deviceOrder[i];
    if (metadata[nextType as keyof ImageMetadata]) {
      return nextType;
    }
  }

  return currentType;
};

const getFallbackDeviceType = (metadata: ImageMetadata, width: number): string => {
  const deviceType = getDeviceType(width);
  if (metadata[deviceType as keyof ImageMetadata]) {
    return deviceType;
  } else {
    return getNextDeviceType(deviceType, metadata);
  }
};

const isBase64 = (url: string): boolean => {
  const base64Pattern = /^data:image\/(jpeg|jpg|png|gif);base64,/;
  return base64Pattern.test(url);
};

interface OptimizedImgProps {
  imageUrl: string;
  alt: string;
  StyledImg: React.ComponentType<StyledImgProps>;
  displaySize: DisplaySize;
}

const OptimizedImg: React.FC<OptimizedImgProps> = ({ imageUrl, alt, StyledImg, displaySize }) => {
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [browserType, setBrowserType] = useState<string | null>(null);
  const [adjustedUrl, setAdjustedUrl] = useState(imageUrl);
  const currentDeviceTypeRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const jsonUrl = imageUrl.replace(/\/[^/]+\.(?:jpeg|jpg|png|gif)$/, '/meta.json');
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch metadata');
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();

          const booleanMetadata: ImageMetadata = {
            MOBILE: data.MOBILE === 'true',
            TABLET: data.TABLET === 'true',
            LAPTOP: data.LAPTOP === 'true',
            DESKTOP: data.DESKTOP === 'true',
            origin: true,
          };

          setMetadata(booleanMetadata);
        } else {
          throw new Error('Response is not JSON');
        }
      } catch (error) {
      }
    };

    if (imageUrl && !isBase64(imageUrl)) {
      fetchMetadata();
    }
  }, [imageUrl]);

  useEffect(() => {
    if (imageUrl && metadata) {
      const handleResize = () => {
        if (isBase64(imageUrl)) {
          return;
        }
        const newDeviceType = getFallbackDeviceType(metadata, window.innerWidth);
        if (currentDeviceTypeRef.current !== newDeviceType) {
          console.log("Crossed breakpoint, setting browserType to ", newDeviceType);
          setBrowserType(newDeviceType);
          currentDeviceTypeRef.current = newDeviceType;
        }

      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [metadata, imageUrl]);

  useEffect(() => {
    if (isBase64(imageUrl)) {
      setAdjustedUrl(imageUrl);
      return;
    }
    if (imageUrl && metadata) {
      // Only adjust URL if we found a valid device type
      if (metadata[browserType as keyof ImageMetadata]) {
        const newUrl = imageUrl.replace(
          /\/([^/]+)\.(jpeg|jpg|png|gif)$/,
          `/${browserType}.$2`
        );
        setAdjustedUrl(newUrl);
      } else {
        setAdjustedUrl(imageUrl);
      }
    }
  }, [browserType, imageUrl]);

  return (
    <StyledImg src={adjustedUrl} alt={alt} $displaySize={displaySize} />
  );
};

export default OptimizedImg;
