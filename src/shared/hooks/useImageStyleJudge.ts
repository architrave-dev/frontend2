import { useEffect, useState } from 'react';
import { convertS3UrlToCloudFrontUrl } from '../aws/s3Upload';
import styled from 'styled-components';
import { DisplaySize } from '../enum/EnumRepository';

type ImageStyleType = "landscape" | "portrait";


export const useImageStyleJudge = (imageUrl?: string) => {
  const [imageStyle, setImageStyle] = useState<ImageStyleType | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      return;
    }

    const url = imageUrl.startsWith('https://s3.')
      ? convertS3UrlToCloudFrontUrl(imageUrl)
      : imageUrl;

    const img = new Image();
    img.onload = () => {
      if (img.width > img.height) {
        setImageStyle("landscape");
      } else {
        setImageStyle("portrait");
      }
    };
    img.src = url;
  }, [imageUrl]);

  return { imageStyle };
};