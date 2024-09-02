import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import ReplaceImageButton from '../../shared/component/ReplaceImageButton';

interface ProjectTitleProps {
  backgroundImg: string;
  setBackgroundImg: (value: string) => void;
}

const RepresentImg: React.FC<ProjectTitleProps> = ({
  backgroundImg, setBackgroundImg
}) => {
  const { isEditMode } = useEditMode();

  return (
    <RepresentImgContainer $backgroundImg={backgroundImg}>
      {isEditMode && (
        <ReplaceImageButton setBackgroundImageUrl={setBackgroundImg} />
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
