import React, { useRef } from 'react';
import styled from 'styled-components';
import { CreateProjectElementReq, CreateWorkReq, SizeData, WorkAlignment, convertSizeToString, convertStringToSize, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';

export interface WorkProps {
  tempId: string;
  alignment: WorkAlignment | null;
  data: CreateWorkReq;
}

const Work: React.FC<WorkProps> = ({ tempId, alignment: initialWorkAlignment, data: initialData }) => {
  const { createdProjectElements, setCreatedProjectElements } = useProjectElementListStoreForUpdate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handlechange('originImgUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };


  const handlechange = (field: keyof CreateWorkReq, value: string | SizeData) => {
    const newCreatedProjectElements: CreateProjectElementReq[] = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, createWorkReq: { ...each.createWorkReq, [field]: value } as CreateWorkReq } : each
    )
    setCreatedProjectElements(newCreatedProjectElements);
  }

  return (
    <WorkWrapper>
      <ImgWrapper>
        <WorkImage src={initialData.originImgUrl} alt={initialData.title} onClick={handleImageClick} />
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
          value={initialData.title}
          onChange={(e) => handlechange("title", e.target.value)}
          placeholder="Title"
        />
        <Textarea
          value={initialData.description}
          onChange={(e) => handlechange("description", e.target.value)}
          placeholder="Description"
        />
      </TitleTextAreaWrpper>
      <WorkInfoEdit>
        <Input
          value={initialData.material}
          onChange={(e) => handlechange("material", e.target.value)}
          placeholder="Material"
        />
        <Input
          value={convertSizeToString(initialData.size)}
          onChange={(e) => handlechange("size", convertStringToSize(e.target.value))}
          placeholder="Size"
        />
        <Input
          type="number"
          value={initialData.prodYear}
          onChange={(e) => handlechange("prodYear", e.target.value)}
          placeholder="Year"
        />
      </WorkInfoEdit>
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
