import React, { useState, useEffect, useRef } from "react";
import { StyledImgProps } from '../dto/StyleCompRepository';
import { DisplaySize } from '../enum/EnumRepository';
import { ImageMetadata } from '../dto/EntityRepository';
import { isBase64, getFallbackDeviceType, convertToJsonMetadata } from '../util/findAdjustImg';
import defaultImg from '../../asset/project/default_1.png'

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
        const timestamp = Date.now();
        const jsonUrl = imageUrl.replace(/\/[^/]+\.(?:jpeg|jpg|png|gif)$/, `/meta.json?ts=${timestamp}`);
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
          console.log("Crossed breakpoint, =>", newDeviceType);
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
    <StyledImg
      src={imageUrl === '' ? defaultImg : adjustedUrl}
      alt={alt}
      $displaySize={displaySize} />
  );
};

export default OptimizedImg;
