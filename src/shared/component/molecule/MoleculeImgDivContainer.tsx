import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import ReplaceImageButton from '../ReplaceImageButton';
import { StyledImgDivContainerProps } from '../../dto/StyleCompRepository';
import defaultImg from '../../../asset/project/default_1.png'

interface MoleculeImgDivContainerProps {
  backgroundImg: string;
  handleChange: (thumbnailUrl: string, originUrl: string) => void;
  StyledImgDivContainer: React.ComponentType<StyledImgDivContainerProps>;
  children?: React.ReactNode;
}

const MoleculeImgDivContainer: React.FC<MoleculeImgDivContainerProps> = ({
  backgroundImg,
  handleChange,
  StyledImgDivContainer,
  children
}) => {
  const { isEditMode } = useEditMode();


  return (
    <StyledImgDivContainer $backgroundImg={backgroundImg !== '' ? backgroundImg : defaultImg}>
      {isEditMode && (
        <ReplaceImageButton imgSrc={backgroundImg} setImageUrl={handleChange} />
      )}
      {children}
    </StyledImgDivContainer>
  );
}


export default MoleculeImgDivContainer;
