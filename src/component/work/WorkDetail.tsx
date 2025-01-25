import React from 'react';
import styled from 'styled-components';
import { WorkDetailData } from '../../shared/dto/EntityRepository';
import MoleculeImg from '../../shared/component/molecule/MoleculeImg';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';
import { WorkDetailInputDescription } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { BtnWorkViewer, OriginBtnRight } from '../../shared/component/headless/button/BtnBody';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import { AlertPosition, AlertType, ServiceType } from '../../shared/enum/EnumRepository';
import { useAui } from '../../shared/hooks/useAui';
import { useWorkDetail } from '../../shared/hooks/useApi/useWorkDetail';
import { useWorkViewStore } from '../../shared/store/WorkViewStore';
import MoleculeShowOriginBtn from '../../shared/component/molecule/MoleculeShowOriginBtn';
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';
import { UpdateWorkDetailReq } from '../../shared/dto/ReqDtoRepository';
import { useImage } from '../../shared/hooks/useApi/useImage';

interface WorkDetailProps {
  index: number;
  workId: string;
  data: WorkDetailData;
}

const WorkDetail: React.FC<WorkDetailProps> = ({ index, workId, data }) => {
  const { aui } = useAui();
  const { isEditMode } = useEditMode();
  const { setStandardAlert } = useStandardAlertStore();
  const { updateWorkDetail, deleteWorkDetail } = useWorkDetail();
  const {
    updateActiveWorkDetailList: handleChange,
    updateImageActiveWorkDetailList: handleImageChange,
    afterDeleteActiveWorkDetail } = useWorkViewStore();
  const { uploadImage } = useImage();


  const handleUpdate = async () => {
    try {
      const baseRequest: UpdateWorkDetailReq = {
        ...data,
        workId,
        updateUploadFileReq: {
          ...data.uploadFile,
          uploadFileId: data.uploadFile.id
        },
      }
      const finalRequest = data.imageChanged
        ? await uploadImage(aui, ServiceType.DETAIL, baseRequest)
        : baseRequest;

      await updateWorkDetail(aui, finalRequest as UpdateWorkDetailReq);
    } catch (err) {
    }
  };

  const handleDelete = async () => {
    const callback = async () => {
      try {
        await deleteWorkDetail(aui, { workId, workDetailId: data.id });
        afterDeleteActiveWorkDetail(data.id)
      } catch (err) { }
    }
    setStandardAlert({
      type: AlertType.CONFIRM,
      position: AlertPosition.TOP,
      content: "Are you sure you want to delete this work detail?",
      callBack: callback
    });
  };

  return (
    <WorkDetailWrapper>
      <>
        <WorkDetailIndex>{index}.</WorkDetailIndex>
        <>
          {isEditMode &&
            <BtnContainer>
              {data.hasChanged &&
                <HeadlessBtn
                  value={"Update"}
                  handleClick={handleUpdate}
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
        </>
      </>
      <ImgWrapper>
        <MoleculeShowOriginBtn originUrl={convertS3UrlToCloudFrontUrl(data.uploadFile.originUrl)} styledBtn={OriginBtnRight} />
        <MoleculeImg
          srcUrl={convertS3UrlToCloudFrontUrl(data.uploadFile.originUrl)}
          alt={"Work Detail"}
          displaySize={null}
          handleChange={(thumbnailUrl: string, originUrl: string) => handleImageChange(data.id, thumbnailUrl, originUrl)}
          StyledImg={WorkImage}
        />
      </ImgWrapper>
      <MoleculeInputDiv
        value={data.description}
        placeholder={"detail description"}
        handleChange={(e) => handleChange(data.id, { description: e.target.value })}
        inputStyle={WorkDetailInputDescription}
        StyledDiv={WorkDetailDescription}
      />
    </WorkDetailWrapper>
  );
}

const WorkDetailWrapper = styled.div`
  position: relative;
  width: 88%;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 8px;
  // background-color: #eae7dc;
`;

const WorkDetailIndex = styled.div`
  width: 100%;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
`;

const ImgWrapper = styled.div`
  position: relative;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 4px;
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
  top: -14px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1vw;
`


const WorkDetailDescription = styled.div`
  width: 100%;
  height: 18px;

  text-align: right;
  ${({ theme }) => theme.typography.Body_03_2};
  color: ${({ theme }) => theme.colors.color_Gray_03};
`;


export default WorkDetail;