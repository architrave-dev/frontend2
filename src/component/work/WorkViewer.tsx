import React from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../shared/store/WorkViewStore';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { useWorkList } from '../../shared/hooks/useApi/useWorkList';
import { BtnWorkViewer, OriginBtnBottom } from '../../shared/component/headless/button/BtnBody';
import { AlertPosition, AlertType, TextAlignment } from '../../shared/enum/EnumRepository';
import { WorkData, convertSizeToString, convertStringToSize } from '../../shared/dto/EntityRepository';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import { WorkViewerInfo, WorkViewerTitle } from '../../shared/component/headless/input/InputBody';
import { TextAreaWorkViewer } from '../../shared/component/headless/textarea/TextAreaBody';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';
import MoleculeTextareaDescription from '../../shared/component/molecule/MoleculeTextareaDescription';
import MoleculeImg from '../../shared/component/molecule/MoleculeImg';
import WorkDetailList from './WorkDetailList';
import MoleculeShowOriginBtn from '../../shared/component/molecule/MoleculeShowOriginBtn';
import { isModified } from '../../shared/hooks/useIsModified';
import { useValidation } from '../../shared/hooks/useValidation';


const WorkViewer: React.FC = () => {
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { updateWork, deleteWork } = useWorkList();
  const { activeWork, clearActiveWork } = useWorkViewStore();
  const { updatedActiveWork, setUpdatedActiveWork } = useWorkViewStoreForUpdate();
  const { setStandardAlert } = useStandardAlertStore();
  const { checkType } = useValidation();

  if (!activeWork || !updatedActiveWork) return null;

  const handleChange = (field: keyof WorkData, value: string) => {
    if (!checkType(field, value)) {
      return;
    };
    if (field === 'size') {
      setUpdatedActiveWork({ ...updatedActiveWork, [field]: convertStringToSize(value) });
    }
    else {
      setUpdatedActiveWork({ ...updatedActiveWork, [field]: value });
    }
  }

  const handleConfirm = async () => {
    if (!isModified(activeWork, updatedActiveWork)) {
      return;
    }
    try {
      await updateWork(aui, updatedActiveWork);
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  };

  const handleDelete = async () => {
    const callback = async () => {
      try {
        await deleteWork(aui, { workId: updatedActiveWork.id });
      } catch (err) {
      } finally {
        clearActiveWork();
        setEditMode(false);
      }
    }
    setStandardAlert({
      type: AlertType.CONFIRM,
      position: AlertPosition.TOP,
      content: "Are you sure you want to delete this work?",
      callBack: callback
    });
  };

  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    setUpdatedActiveWork({
      ...updatedActiveWork,
      originUrl,
      thumbnailUrl,
    });
  }

  return (
    <WorkViewComp>
      <WorkInfoContainer>
        <MoleculeInputDiv
          value={updatedActiveWork.title}
          placeholder={"Title"}
          handleChange={(e) => handleChange("title", e.target.value)}
          inputStyle={WorkViewerTitle}
          StyledDiv={Title}
        />
        <WorkInfo>
          <MoleculeInputDiv
            value={updatedActiveWork.prodYear}
            placeholder={"ProdYear"}
            handleChange={(e) => handleChange("prodYear", e.target.value)}
            inputStyle={WorkViewerInfo}
            StyledDiv={Info}
          />
          <DividerSmall>|</DividerSmall>
          <MoleculeInputDiv
            value={updatedActiveWork.material}
            placeholder={"Material"}
            handleChange={(e) => handleChange("material", e.target.value)}
            inputStyle={WorkViewerInfo}
            StyledDiv={Info}
          />
          <DividerSmall>|</DividerSmall>
          <MoleculeInputDiv
            value={convertSizeToString(updatedActiveWork.size)}
            placeholder={"Size"}
            handleChange={(e) => handleChange("size", e.target.value)}
            inputStyle={WorkViewerInfo}
            StyledDiv={Info}
          />
        </WorkInfo>
        <WorkInfo>
          <MoleculeInputDiv
            value={updatedActiveWork.price}
            placeholder={"Price ($)"}
            handleChange={(e) => handleChange("price", e.target.value)}
            inputStyle={WorkViewerInfo}
            StyledDiv={Info}
          />
          <DividerSmall>|</DividerSmall>
          <MoleculeInputDiv
            value={updatedActiveWork.collection}
            placeholder={"Collection"}
            handleChange={(e) => handleChange("collection", e.target.value)}
            inputStyle={WorkViewerInfo}
            StyledDiv={Info}
          />
        </WorkInfo>
        <MoleculeTextareaDescription
          value={updatedActiveWork.description}
          handleChange={(e) => handleChange("description", e.target.value)}
          alignment={TextAlignment.LEFT}
          StyledTextarea={TextAreaWorkViewer}
          StyledDescription={Description}
        />
      </WorkInfoContainer>
      <ImgWrapper>
        <MoleculeShowOriginBtn originUrl={updatedActiveWork.originUrl} styledBtn={OriginBtnBottom} />
        <MoleculeImg
          srcUrl={updatedActiveWork.originUrl}
          alt={updatedActiveWork.title}
          displaySize={null}
          handleChange={(thumbnailUrl: string, originUrl: string) => setOriginThumbnailUrl(thumbnailUrl, originUrl)}
          StyledImg={WorkImage}
        />
        {isEditMode &&
          <BtnContainer>
            {isModified(activeWork, updatedActiveWork) &&
              <HeadlessBtn
                value={"Confirm"}
                handleClick={handleConfirm}
                StyledBtn={BtnWorkViewer}
              />
            }
            <HeadlessBtn
              value={"Delete"}
              handleClick={handleDelete}
              StyledBtn={BtnWorkViewer}
            />
          </BtnContainer>
        }
      </ImgWrapper>
      <WorkDetailList />
    </WorkViewComp>
  );
}

const WorkViewComp = styled.section`
  position: relative;
  width: 35vw;
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow-y: scroll; /* 넘칠 경우 스크롤 생성 */
  &::-webkit-scrollbar {
    display: none;
  }

  // background-color: #eae7dc;
`;



const WorkInfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 10px;
  padding-bottom: 16px;
`

const Title = styled.h2`
  width: 100%;
  height:28px;

  display: flex;
  align-items: center;
  
  padding-bottom: 1px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_02_2};
`;

const WorkInfo = styled.div`
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
`;

const Info = styled.div`
  height: 18px;
  padding-right:4px;
  margin-bottom: 1px;
  text-align: center;
  ${({ theme }) => theme.typography.Body_04};
`;

const DividerSmall = styled.span`
  height: 18px;
  padding-right:4px;
  color: ${({ theme }) => theme.colors.color_Gray_05};
  ${({ theme }) => theme.typography.Body_04};
`;

const Description = styled.div`
  padding: 6px 0 9px 0;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_03_2};
`


const ImgWrapper = styled.div`
  position: relative;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 50px;
`

const WorkImage = styled.img`
  //부모 크기에 맞춤
  width: 100%;
  height: 100%; 
  //이미지 크기에 맞춤
  // max-width: 100%; 
  // max-height: 100%;
  object-fit: contain;
`;

const BtnContainer = styled.div`
  position: absolute;
  bottom: 10px;

  width: 100%;
  
  display: flex;
  justify-content: flex-end;
  gap: 1vw;
`

export default WorkViewer;