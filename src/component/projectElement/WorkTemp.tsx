import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CreateProjectElementReq, CreateWorkReq, SizeData, WorkAlignment, convertSizeToString, convertStringToSize, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import { uploadToS3 } from '../../shared/aws/s3Upload';

export interface WorkProps {
  tempId: string;
  alignment: WorkAlignment | null;
  data: CreateWorkReq;
}

const Work: React.FC<WorkProps> = ({ tempId, alignment: initialWorkAlignment, data: initialData }) => {
  const { createdProjectElements, setCreatedProjectElements } = useProjectElementListStoreForUpdate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //   handlechange('originUrl', reader.result as string);
        // };
        // reader.readAsDataURL(file);
        const imageUrl = await uploadToS3(file, process.env.REACT_APP_S3_BUCKET_NAME!);
        handlechange('originUrl', imageUrl);
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


  const handlechange = (field: keyof CreateWorkReq, value: string | SizeData) => {
    const newCreatedProjectElements: CreateProjectElementReq[] = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, createWorkReq: { ...each.createWorkReq, [field]: value } as CreateWorkReq } : each
    )
    setCreatedProjectElements(newCreatedProjectElements);
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      console.log("textarea.scrollHeight: ", `${textarea.scrollHeight}`)
      textarea.style.height = 'auto'; // 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // scrollHeight를 기준으로 높이 설정
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [initialData.description]);

  return (
    <WorkWrapper>
      <ImgWrapper>
        <WorkImage src={initialData.originUrl} alt={initialData.title} onClick={handleImageClick} />
        <ReplaceImageButton onClick={triggerFileInput}>
          {isUploading ? 'Uploading...' : 'Replace Image'}
        </ReplaceImageButton>
        <HiddenFileInput
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
        />
      </ImgWrapper>
      <TitleInfoWrpper>
        <TitleInput
          value={initialData.title}
          onChange={(e) => handlechange("title", e.target.value)}
          placeholder="Title"
        />
        <Textarea
          ref={textareaRef}
          value={initialData.description}
          onChange={(e) => handlechange("description", e.target.value)}
          placeholder="Description"
        />
        <WorkInfo>
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
        </WorkInfo>
      </TitleInfoWrpper>
    </WorkWrapper>
  );
};

const WorkWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: ${({ theme }) => theme.colors.color_Gray_06};
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

const TitleInfoWrpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const WorkInfo = styled.div`
  display: flex;
  gap: 4px;
`;

const Input = styled.input`
  height: 18px;
  width: 120px;
  padding: 0 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  outline: none;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 19px;
  padding: 4px 8px;
  margin-bottom: 2px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B02};
  line-height: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  outline: none;
  text-align: center;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 18px;
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  color: ${({ theme }) => theme.colors.color_Gray_04};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  outline: none;
  text-align: center;
  resize: none; 
  overflow: hidden;
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

export default Work;
