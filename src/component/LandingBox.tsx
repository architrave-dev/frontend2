import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { uploadToS3 } from '../shared/aws/s3Upload';
import { useEditMode } from '../shared/hooks/useEditMode';
import { useLandingBox } from '../shared/hooks/useLandingBox';
import defaultImg from '../asset/project/launches_header_desktop.jpg';
import { useAui } from '../shared/hooks/useAui';


const LandingBox: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { isLoading, landingBox, getLandingBox, updateLandingBox } = useLandingBox();

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(landingBox?.title);
  const [description, setDescription] = useState(landingBox?.description);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(landingBox?.originUrl);

  const { aui } = useAui();

  useEffect(() => {
    if (!aui) return;
    try {
      getLandingBox(aui);
    } catch (error) {
      console.error('get LandingBox failed:', error);
    }
  }, [aui]);

  useEffect(() => {
    if (landingBox) {
      setTitle(landingBox.title);
      setDescription(landingBox.description);
      setBackgroundImageUrl(landingBox.originUrl);
    }
  }, [landingBox]);


  if (!landingBox) {
    return null;
  }
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadToS3(file, process.env.REACT_APP_S3_BUCKET_NAME!);
        setBackgroundImageUrl(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Container $backgroundimage={backgroundImageUrl ? backgroundImageUrl : defaultImg}>
      {isEditMode ? (
        <>
          <ReplaceImageButton onClick={triggerFileInput} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Replace Image'}
          </ReplaceImageButton>
          <HiddenFileInput
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
          />
          <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
          />
          <TextArea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
          />
        </>
      ) : (
        <>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </>
      )}
    </Container>
  );
};

const Container = styled.div<{ $backgroundimage: string }>`
  position: relative;

  background-image: url(${props => props.$backgroundimage});
  background-size: cover;
  background-position: center;

  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px 60px;
`;

const Title = styled.h1`
  max-width: 60vw;
  font-size: ${({ theme }) => theme.fontSize.font_H01};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 20px;
`;

const Description = styled.p`
  max-width: 70vw;

  font-size: ${({ theme }) => theme.fontSize.font_B01};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const Input = styled.input`
  width: 70%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.fontSize.font_H01};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 60%;
  min-height: 80px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
  font-size: ${({ theme }) => theme.fontSize.font_B01};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  resize: vertical;
`;


const ReplaceImageButton = styled.button`
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


export default LandingBox;
