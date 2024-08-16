import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectDetail } from '../../shared/hooks/useProjectDetail';



const RepresentImg: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { isLoading, project } = useProjectDetail();
  const [backgroundImg, setBackgroundImg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (project) {
      setBackgroundImg(project.originUrl);
    }
  }, [project]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // setBackgroundImg(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };


  return (
    <RepresentImgContainer $backgroundImg={backgroundImg}>
      {isEditMode && (
        <>
          <ReplaceImgButton onClick={triggerFileInput}>
            이미지 교체
          </ReplaceImgButton>
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


const ReplaceImgButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const HiddenFileInput = styled.input`
  display: none;
`;


export default RepresentImg;
