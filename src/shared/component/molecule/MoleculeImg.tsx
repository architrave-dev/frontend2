import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import ReplaceImageButton from '../ReplaceImageButton';
import { StyledImgProps } from '../../dto/StyleCompRepository';
import defaultImg from '../../../asset/project/default_1.png'
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
      {srcUrl === '' ?
        <StyledImg src={defaultImg} alt={alt} $displaySize={displaySize} />
        :
        <OptimizedImg imageUrl={srcUrl} alt={alt} StyledImg={StyledImg} />
      }
      {isEditMode && <ReplaceImageButton imgSrc={srcUrl} setImageUrl={handleChange} />}
    </>
  );
}


export default MoleculeImg;
