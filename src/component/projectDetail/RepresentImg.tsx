import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import ReplaceImageButton from '../../shared/component/ReplaceImageButton';
import { useProjectStoreForUpdate } from '../../shared/store/projectStore';

interface RepresentImgProps {
  backgroundImg: string;
}

const RepresentImg: React.FC<RepresentImgProps> = ({
  backgroundImg
}) => {
  const { isEditMode } = useEditMode();
  const { updatedProjectDto, setUpdatedProjectDto } = useProjectStoreForUpdate();


  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    if (!updatedProjectDto) return;
    setUpdatedProjectDto({
      ...updatedProjectDto,
      originUrl,
      thumbnailUrl
    });
  }

  return (
    <RepresentImgContainer $backgroundImg={backgroundImg}>
      {isEditMode && (
        <ReplaceImageButton setImageUrl={setOriginThumbnailUrl} />
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
