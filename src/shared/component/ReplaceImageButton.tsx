import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { uploadToS3 } from '../aws/s3Upload';
import { useEditMode } from '../hooks/useEditMode';
import { useAui } from '../hooks/useAui';

export interface ReplaceImageButtonProps {
  setImageUrl: (value1: string, value2: string) => void;
}

const ReplaceImageButton: React.FC<ReplaceImageButtonProps> = ({ setImageUrl }) => {
  const { isEditMode } = useEditMode();
  const { aui } = useAui();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const { originUrl, thumbnailUrl } = await uploadToS3(file, process.env.REACT_APP_S3_BUCKET_NAME!, aui);
        setImageUrl(originUrl, thumbnailUrl);
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

  if (!isEditMode) {
    return null;
  }

  return (
    <>
      <ReplaceImgBtn onClick={triggerFileInput} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Replace Image'}
      </ReplaceImgBtn>
      <HiddenFileInput
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
      />
    </>
  );
};

const ReplaceImgBtn = styled.button`
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


export default ReplaceImageButton;
