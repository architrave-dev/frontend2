import React, { useRef } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { ProjectElementData, SizeData, UpdateProjectElementReq, UpdateWorkReq, WorkAlignment, WorkData, convertSizeToString, convertStringToSize, useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';

export interface WorkProps {
  alignment: WorkAlignment | null;
  data: WorkData;
}

const Work: React.FC<WorkProps> = ({ alignment: initialWorkAlignment, data: initialData }) => {
  const { isEditMode } = useEditMode();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { updatedProjectElements, setUpdatedProjectElements } = useProjectElementListStoreForUpdate();
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
        handlechange('originImgUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlechange = (field: keyof WorkData, value: string | SizeData) => {
    const targetElement = updatedProjectElements.find(pe => pe.updateWorkReq?.id === initialData.id);
    if (targetElement) {
      //updatedProjectElements에 있다면
      const updatedProjectElementList = updatedProjectElements.map(each =>
        each.updateWorkReq?.id === initialData.id ? { ...each, updateWorkReq: { ...each.updateWorkReq, [field]: value } as UpdateWorkReq } : each
      )
      setUpdatedProjectElements(updatedProjectElementList);
    } else {
      //updatedProjectElements에 없다면
      const target = projectElementList.find(pe => pe.work?.id === initialData.id);

      if (!target) return;
      const targetWork = target.work;
      if (!targetWork) return;
      //target으로 UpdateProjectElementReq 를 생성 후 
      const convetedToProjectElementReq: UpdateProjectElementReq = {
        id: target.id,
        updateWorkReq: {
          id: targetWork.id,
          originImgUrl: targetWork.originImgUrl,
          thumbnailUrl: targetWork.thumbnailUrl,
          title: targetWork.title,
          description: targetWork.description,
          size: targetWork.size,
          material: targetWork.material,
          prodYear: targetWork.prodYear,
          isDeleted: targetWork.isDeleted
        },
        workAlignment: target.workAlignment,
        updateTextBoxReq: null,
        textBoxAlignment: null,
        dividerType: null,
        peOrder: target.peOrder
      }
      //projectElementList에서 id로 찾고
      //updatedProjectElements에 추가한다.
      const newUpdateProjectElementReq: UpdateProjectElementReq = {
        ...convetedToProjectElementReq,
        updateWorkReq: {
          ...convetedToProjectElementReq.updateWorkReq,
          [field]: value
        } as UpdateWorkReq
      };
      setUpdatedProjectElements([...updatedProjectElements, newUpdateProjectElementReq]);
    }
    const updatedProjectElementList: ProjectElementData[] = projectElementList.map(each =>
      each.work?.id === initialData.id ? { ...each, work: { ...each.work, [field]: value } as WorkData } : each
    )
    setProjectElementList(updatedProjectElementList);
  }

  return (
    <WorkWrapper>
      {isEditMode ? (
        <>
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
        </>
      ) : (
        <>
          <ImgWrapper>
            <WorkImage src={initialData.originImgUrl} alt={initialData.title} />
          </ImgWrapper>
          <Title>[{initialData.title}]</Title>
          <Description>{initialData.description}</Description>
          <WorkInfo>
            <Material>{initialData.material},</Material>
            <Size>{convertSizeToString(initialData.size)},</Size>
            <ProdYear>{initialData.prodYear}</ProdYear>
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
