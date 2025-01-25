import React from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useWorkViewStore } from '../../shared/store/WorkViewStore';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { useWorkList } from '../../shared/hooks/useApi/useWorkList';
import { BtnWorkViewer, BtnWorkViewerBlack, OriginBtnBottom } from '../../shared/component/headless/button/BtnBody';
import { AlertPosition, AlertType, SelectType, ServiceType, TextAlignment } from '../../shared/enum/EnumRepository';
import { SizeData, WorkData, convertSizeToString, convertStringToSize } from '../../shared/dto/EntityRepository';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import { WorkViewerInfo, WorkViewerTitle } from '../../shared/component/headless/input/InputBody';
import { TextAreaWorkViewer } from '../../shared/component/headless/textarea/TextAreaBody';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';
import MoleculeTextareaDescription from '../../shared/component/molecule/MoleculeTextareaDescription';
import MoleculeImg from '../../shared/component/molecule/MoleculeImg';
import WorkDetailList from './WorkDetailList';
import MoleculeShowOriginBtn from '../../shared/component/molecule/MoleculeShowOriginBtn';
import { useValidation } from '../../shared/hooks/useValidation';
import SelectBox from '../../shared/component/SelectBox';
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';
import { UpdateWorkReq } from '../../shared/dto/ReqDtoRepository';
import { useImage } from '../../shared/hooks/useApi/useImage';


const WorkViewer: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { aui } = useAui();
  const { updateWork, deleteWork } = useWorkList();
  const { activeWork, hasChanged, imageChanged, updateActiveWork: handleChange, updateImage: handleImageChange } = useWorkViewStore();
  const { setStandardAlert } = useStandardAlertStore();
  const { checkType } = useValidation();
  const { uploadImage } = useImage();

  if (!activeWork) return null;

  const handleChangeWithValidate = (field: keyof WorkData, value: string | SizeData) => {
    if (!checkType(field, value)) {
      return;
    };
    handleChange({ [field]: value });
  }

  const handleConfirm = async () => {
    if (!activeWork || !aui) return;
    try {
      const baseRequest: UpdateWorkReq = {
        ...activeWork,
        updateUploadFileReq: {
          ...activeWork.uploadFile,
          uploadFileId: activeWork.uploadFile.id
        }
      }

      const finalRequest = imageChanged
        ? await uploadImage(aui, ServiceType.WORK, baseRequest)
        : baseRequest;

      await updateWork(aui, finalRequest as UpdateWorkReq);
      setEditMode(false);
    } catch (err) {
    }
  };

  const handleDelete = async () => {
    const callback = async () => {
      try {
        await deleteWork(aui, { workId: activeWork.id });
      } catch (err) {
      } finally {
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


  return (
    <WorkViewComp>
      <WorkInfoContainer>
        <MoleculeInputDiv
          value={activeWork.title}
          placeholder={"Title"}
          handleChange={(e) => handleChangeWithValidate("title", e.target.value)}
          inputStyle={WorkViewerTitle}
          StyledDiv={Title}
        />
        <WorkInfo>
          <MoleculeInputDiv
            value={activeWork.prodYear}
            placeholder={"ProdYear"}
            handleChange={(e) => handleChangeWithValidate("prodYear", e.target.value)}
            inputStyle={WorkViewerInfo}
            StyledDiv={Info}
          />
          <DividerSmall>|</DividerSmall>
          <MoleculeInputDiv
            value={activeWork.material}
            placeholder={"Material"}
            handleChange={(e) => handleChangeWithValidate("material", e.target.value)}
            inputStyle={WorkViewerInfo}
            StyledDiv={Info}
          />
          <DividerSmall>|</DividerSmall>
          <MoleculeInputDiv
            value={convertSizeToString(activeWork.size)}
            placeholder={"Size"}
            handleChange={(e) => handleChangeWithValidate("size", convertStringToSize(e.target.value))}
            inputStyle={WorkViewerInfo}
            StyledDiv={Info}
          />
        </WorkInfo>
        <WorkInfo>
          <MoleculeInputDiv
            value={activeWork.price}
            defaultValue={"Not for Sale"}
            placeholder={"Price ($)"}
            handleChange={(e) => handleChangeWithValidate("price", e.target.value)}
            inputStyle={WorkViewerInfo}
            StyledDiv={Info}
          />
          <DividerSmall>|</DividerSmall>
          <MoleculeInputDiv
            value={activeWork.collection}
            defaultValue={"Artist's Collection"}
            placeholder={"Collection"}
            handleChange={(e) => handleChangeWithValidate("collection", e.target.value)}
            inputStyle={WorkViewerInfo}
            StyledDiv={Info}
          />
        </WorkInfo>
        <WorkInfo>
          {isEditMode ?
            <SelectBoxWrapper>
              <SelectBox
                value={activeWork.workType}
                selectType={SelectType.WORK_TYPE}
                handleChange={(value) => handleChangeWithValidate("workType", value)}
                direction={false} />
            </SelectBoxWrapper>
            : <Info>{activeWork.workType}</Info>
          }
        </WorkInfo>
        <MoleculeTextareaDescription
          value={activeWork.description}
          handleChange={(e) => handleChangeWithValidate("description", e.target.value)}
          alignment={TextAlignment.LEFT}
          StyledTextarea={TextAreaWorkViewer}
          StyledDescription={Description}
        />
      </WorkInfoContainer>
      <ImgWrapper>
        <MoleculeShowOriginBtn originUrl={convertS3UrlToCloudFrontUrl(activeWork.uploadFile.originUrl)} styledBtn={OriginBtnBottom} />
        <MoleculeImg
          srcUrl={convertS3UrlToCloudFrontUrl(activeWork.uploadFile.originUrl)}
          alt={activeWork.title}
          displaySize={null}
          handleChange={(thumbnailUrl: string, originUrl: string) => handleImageChange(thumbnailUrl, originUrl)}
          StyledImg={WorkImage}
        />
        {isEditMode &&
          <BtnContainer>
            {hasChanged &&
              <HeadlessBtn
                value={"Update"}
                handleClick={handleConfirm}
                StyledBtn={BtnWorkViewer}
              />
            }
            <HeadlessBtn
              value={"Delete"}
              handleClick={handleDelete}
              StyledBtn={BtnWorkViewerBlack}
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

const SelectBoxWrapper = styled.article`
  width: 50%;
  color: ${({ theme }) => theme.colors.color_Gray_04};
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