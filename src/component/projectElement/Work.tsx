import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { WorkAlignment, WorkData, convertSizeToString } from '../../shared/store/projectStore';

export interface WorkProps {
  alignment: WorkAlignment | null;
  data: WorkData;
}

const Work: React.FC<WorkProps> = ({ alignment: initialWorkAlignment, data: initialData }) => {
  const { isEditMode } = useEditMode();
  const [image, setImage] = useState(initialData.originImgUrl);
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [material, setMaterial] = useState(initialData.material);
  const [size, setSize] = useState(convertSizeToString(initialData.size));
  const [prodYear, setProdYear] = useState(initialData.prodYear);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (isEditMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };


  return (
    <WorkWrapper>
      {isEditMode ? (
        <>
          <ImgWrapper>
            <WorkImage src={image} alt={title} onClick={handleImageClick} />
            <ReplaceImageButton onClick={triggerFileInput}>
              이미지 교체
            </ReplaceImageButton>
            <HiddenFileInput
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
            />
          </ImgWrapper>
          <TitleTextAreaWrpper>
            <TitleInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </TitleTextAreaWrpper>
          <WorkInfoEdit>
            <Input
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Material"
            />
            <Input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="Size"
            />
            <Input
              type="number"
              value={prodYear}
              onChange={(e) => setProdYear(e.target.value)}
              placeholder="Year"
            />
          </WorkInfoEdit>
        </>
      ) : (
        <>
          <ImgWrapper>
            <WorkImage src={image} alt={title} />
          </ImgWrapper>
          <Title>[{title}]</Title>
          <Description>{description}</Description>
          <WorkInfo>
            <Material>{material},</Material>
            <Size>{size},</Size>
            <ProdYear>{prodYear}</ProdYear>
          </WorkInfo>
        </>
      )}
    </WorkWrapper>
  );
};

const WorkWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImgWrapper = styled.div`
  position: relative;
`

const WorkImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  margin-bottom: 16px;
  object-fit: contain;
`;

const Title = styled.h2`
  width: 100%;
  padding: 0 calc(10vw);
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-align: center;
`;

const Description = styled.div`
  width: 100%;
  padding: 0 calc(10vw);
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-align: center;
  margin-bottom: 4px;
`
const WorkInfoEdit = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; 
  padding: 0 calc(10vw);
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-align: center;
`;

const WorkInfo = styled.div`
  width: 100%;
  padding: 0 calc(10vw);
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-align: center;
`;

const Material = styled.span`
  margin-right: 4px;
`;
const Size = styled.span`
  margin-right: 4px;
`;
const ProdYear = styled.span``;

const TitleTextAreaWrpper = styled.div`
  width: 100%;
  padding: 0 calc(10vw);
`

const TitleInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  color: ${({ theme }) => theme.colors.color_Gray_04};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  outline: none;
`;

const Input = styled.input`
  width: 200px;
  padding: 8px;
  margin-bottom: 8px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  color: ${({ theme }) => theme.colors.color_Gray_04};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  outline: none;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 8px;
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  color: ${({ theme }) => theme.colors.color_Gray_04};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  outline: none;
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

export default Work;
