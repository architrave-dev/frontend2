import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';

interface ProjectSimpleProps {
  initialTitle: string;
  initialDescription: string;
  initialImage: string;
}


const ProjectSimple: React.FC<ProjectSimpleProps> = ({
  initialTitle,
  initialDescription,
  initialImage
  // onSave 
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [image, setImage] = useState(initialImage);
  const { isEditMode } = useEditMode();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newImage, setNewImage] = useState<File | null>(null);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setNewImage(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <ProjectSimpleComp>
      {isEditMode ? (
        <>
          <ProjectSimpleInfo>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
            {/* <SaveButton onClick={handleSave}>Save</SaveButton> */}
          </ProjectSimpleInfo>
          <ProjectRepresent $backgroundimage={image}>
            <ReplaceImageButton onClick={triggerFileInput}>
              이미지 교체
            </ReplaceImageButton>
            <HiddenFileInput
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
            />
          </ProjectRepresent>
        </>
      ) : (
        <>
          <ProjectSimpleInfo>
            <ProjectSimpleTitle>{title}</ProjectSimpleTitle>
            <ProjectSimpleDescription>{description}</ProjectSimpleDescription>
          </ProjectSimpleInfo>
          <ProjectRepresent $backgroundimage={image} />
        </>
      )}
    </ProjectSimpleComp>
  );
};

const ProjectSimpleComp = styled.div`
  position: relative;

  width: 100%;
  height: 56vh;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  margin-bottom: 20px;
  background-color: #EECFBB;
`;

const ProjectSimpleInfo = styled.div`
  width: calc(38vw);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 20px;
`;
const ProjectSimpleTitle = styled.h2`
  margin-bottom: 10px;
  text-align: end;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.font_H02};
`;

const ProjectSimpleDescription = styled.div`
  text-align: end;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.font_B01};
`;

const ProjectRepresent = styled.div<{ $backgroundimage: string }>`
  width: calc(62vw);
  height: 100%;

  background-image: url(${props => props.$backgroundimage});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.4rem;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.fontSize.font_H02};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: right;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 70px;
  padding: 0.4rem;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.fontSize.font_B01};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-align: end;
  resize: vertical;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
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


export default ProjectSimple;
