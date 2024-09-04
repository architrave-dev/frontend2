import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { ProjectElementData, SizeData, UpdateProjectElementReq, UpdateWorkReq, WorkData, convertSizeToString, convertStringToSize, useProjectElementListStore, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import ReplaceImageButton from '../../shared/component/ReplaceImageButton';
import defaultImg from '../../asset/project/default_1.png';
import { WorkAlignment } from '../../shared/component/SelectBox';
import WorkInput from '../../shared/component/WorkInput';

export interface WorkProps {
  alignment: WorkAlignment | null;
  data: WorkData;
}

const Work: React.FC<WorkProps> = ({ alignment: initialWorkAlignment, data: initialData }) => {
  const { isEditMode } = useEditMode();
  const { projectElementList, setProjectElementList } = useProjectElementListStore();
  const { updatedProjectElements, setUpdatedProjectElements } = useProjectElementListStoreForUpdate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);


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
          originUrl: targetWork.originUrl,
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
      {isEditMode ? (
        <>
          <ImgWrapper>
            <WorkImage src={initialData.originUrl === '' ? defaultImg : initialData.originUrl} alt={initialData.title} />
            <ReplaceImageButton setBackgroundImageUrl={(imageUrl: string) => handlechange('originUrl', imageUrl)} />
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
              <WorkInput
                type={"text"}
                value={initialData.material}
                placeholder={"Material"}
                handleChange={(e) => handlechange("material", e.target.value)}
              />
              <WorkInput
                type={"text"}
                value={convertSizeToString(initialData.size)}
                placeholder={"Size"}
                handleChange={(e) => handlechange("size", convertStringToSize(e.target.value))}
              />
              <WorkInput
                type={"number"}
                value={initialData.prodYear}
                placeholder={"Year"}
                handleChange={(e) => handlechange("prodYear", e.target.value)}
              />
            </WorkInfo>
          </TitleInfoWrpper>
        </>
      ) : (
        <>
          <ImgWrapper>
            <WorkImage src={initialData.originUrl === '' ? defaultImg : initialData.originUrl} alt={initialData.title} />
          </ImgWrapper>
          <TitleInfoWrpper>
            <Title>[ {initialData.title} ]</Title>
            <Description>{initialData.description}</Description>
            <WorkInfo>
              <Info>{initialData.material},</Info>
              <Info>{convertSizeToString(initialData.size)},</Info>
              <Info>{initialData.prodYear}</Info>
            </WorkInfo>
          </TitleInfoWrpper>
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

const Info = styled.div`
  height: 18px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-align: center;
`;

const Title = styled.h2`
  width: 100%;
  height: 18px;
  padding: 0px 8px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B02};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-align: center;
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


const Description = styled.div`
  height: 18px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-align: center;
  margin-bottom: 1px;
`

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

export default Work;
