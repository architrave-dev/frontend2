import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import ReplaceImageButton from '../ReplaceImageButton';
import { StyledImgProps } from '../../dto/StyleCompRepository';
import { DisplaySize } from '../../enum/EnumRepository';
import OptimizedImg from '../OptimizedImg';

interface MoleculeImgProps {
  srcUrl: string;
  alt: string;
  displaySize: DisplaySize;
  handleChange: (originUrl: string) => void;
  StyledImg: React.ComponentType<StyledImgProps>;
}

const MoleculeImg: React.FC<MoleculeImgProps> = ({
  srcUrl,
  alt,
  displaySize,
  handleChange,
  StyledImg,
}) => {
  const { isEditMode } = useEditMode();
  return (
    <>
      <OptimizedImg imageUrl={srcUrl} alt={alt} StyledImg={StyledImg} displaySize={displaySize} />
      {isEditMode && <ReplaceImageButton imgSrc={srcUrl} setImageUrl={handleChange} />}
    </>
  );
}


export default MoleculeImg;
