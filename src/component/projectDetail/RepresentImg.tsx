import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { uploadToS3 } from '../../shared/aws/s3Upload';

interface ProjectTitleProps {
  backgroundImg: string;
  setBackgroundImg: (value: string) => void;
}

const RepresentImg: React.FC<ProjectTitleProps> = ({
  backgroundImg, setBackgroundImg
}) => {
  const { isEditMode } = useEditMode();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadToS3(file, process.env.REACT_APP_S3_BUCKET_NAME!);
        setBackgroundImg(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };


  return (
    <RepresentImgContainer $backgroundImg={backgroundImg}>
      {isEditMode && (
        <>
          <ReplaceImageButton onClick={triggerFileInput}>
            {isUploading ? 'Uploading...' : 'Replace Image'}
          </ReplaceImageButton>
          <HiddenFileInput
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
          />
        </>
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


const ReplaceImageButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.color_Alpha_03};
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Alpha_04};
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;


export default RepresentImg;
