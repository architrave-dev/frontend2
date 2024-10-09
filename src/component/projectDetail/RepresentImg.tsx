import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import ReplaceImageButton from '../../shared/component/ReplaceImageButton';

interface RepresentImgProps {
  backgroundImg: string;
  setBackgroundImg: (value: string) => void;
  setThumbnailImg: (value: string) => void;
}

const RepresentImg: React.FC<RepresentImgProps> = ({
  backgroundImg, setBackgroundImg, setThumbnailImg
}) => {
  const { isEditMode } = useEditMode();

  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    setBackgroundImg(originUrl);
    setThumbnailImg(thumbnailUrl);
  }

  return (
    <RepresentImgContainer $backgroundImg={backgroundImg}>
      {isEditMode && (
        <ReplaceImageButton setImageUrl={(thumbnailUrl: string, originUrl: string) => setOriginThumbnailUrl(thumbnailUrl, originUrl)} />
      )}
    </RepresentImgContainer>
  );
}

const RepresentImgContainer = styled.div<{ $backgroundImg: string }>`
  position: relative;

  background-image: url(${props => props.$backgroundImg});
  background-size: cover;
  background-position: center;

  height: 100vh;
`;


export default RepresentImg;
