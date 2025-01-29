import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../hooks/useEditMode';

export interface ReplaceImageButtonProps {
  imgSrc: string;
  setImageUrl: (originUrl: string) => void;
}

const ReplaceImageButton: React.FC<ReplaceImageButtonProps> = ({ imgSrc, setImageUrl }) => {
  const { isEditMode } = useEditMode();
  const [isLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const localImageUrl = reader.result as string; // FileReader의 결과는 string 타입
        setImageUrl(localImageUrl); // 로컬 URL을 originUrl로 전달 
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
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
      <ReplaceImgBtn onClick={triggerFileInput} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Replace Image'}
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
    background-color: ${({ theme }) => theme.colors.color_Alpha_05};
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;


export default ReplaceImageButton;
