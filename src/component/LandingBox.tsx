import React, { useState, useRef } from 'react';
import styled from 'styled-components';

interface LandingBoxProps {
  initialTitle: string;
  initialDescription: string;
  initialBackgroundImage: string;
  isEditMode: boolean;
  onImageChange: (file: File) => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

const LandingBox: React.FC<LandingBoxProps> = ({
  initialTitle,
  initialDescription,
  initialBackgroundImage,
  isEditMode,
  onImageChange,
  onTitleChange,
  onDescriptionChange
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [backgroundImage, setBackgroundImage] = useState(initialBackgroundImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
      onImageChange(file);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onTitleChange(newTitle);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    onDescriptionChange(newDescription);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Container backgroundImage={backgroundImage}>
      {isEditMode ? (
        <>
          <ReplaceImageButton onClick={triggerFileInput}>
            이미지 교체
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
            onChange={handleImageChange}
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

const Container = styled.div<{ backgroundImage: string }>`
  position: relative;

  background-image: url(${props => props.backgroundImage});
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
