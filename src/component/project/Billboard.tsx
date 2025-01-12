import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useBillboard } from '../../shared/hooks/useApi/useBillboard';
import { useAui } from '../../shared/hooks/useAui';
import { TextAreaBillboard } from '../../shared/component/headless/textarea/TextAreaBody';
import { InputBillboard } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnConfirm } from '../../shared/component/headless/button/BtnBody';
import { ServiceType, TextAlignment } from '../../shared/enum/EnumRepository';
import MoleculeImgDivContainer from '../../shared/component/molecule/MoleculeImgDivContainer';
import { StyledImgDivContainerProps } from '../../shared/dto/StyleCompRepository';
import MoleculeTextareaDescription from '../../shared/component/molecule/MoleculeTextareaDescription';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';
import { UpdateBillboardReq } from '../../shared/dto/ReqDtoRepository';
import { ErrorCode } from '../../shared/api/errorCode';
import { base64ToFileWithMime, convertS3UrlToCloudFrontUrl, uploadToS3 } from '../../shared/aws/s3Upload';
import { useBillboardStore } from '../../shared/store/billboardStore';


const Billboard: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { billboard, getBillboard, updateBillboard } = useBillboard();
  const { hasChanged, imageChanged,
    updatBillboard: handleChange,
    updateImage: handleImageChange
  } = useBillboardStore();
  const { aui } = useAui();

  useEffect(() => {
    const getBillboardWithApi = async () => {
      if (!aui) return;
      try {
        console.log("getting billboard...")
        await getBillboard(aui);
      } catch (error) { }
    }
    getBillboardWithApi();
  }, [aui]);

  if (!billboard) { return null; }

  const uploadFileWithLocalUrl = async (serviceType: ServiceType, prevData: UpdateBillboardReq, aui: string): Promise<UpdateBillboardReq> => {
    const localImageUrl = prevData.updateUploadFileReq.originUrl;
    const file = base64ToFileWithMime(localImageUrl);
    try {
      const { originUrl, thumbnailUrl } = await uploadToS3(file, aui, serviceType, []);
      return {
        ...prevData,
        updateUploadFileReq: { ...prevData.updateUploadFileReq, originUrl, thumbnailUrl }
      };
    } catch (error) {
      throw new Error(ErrorCode.AWS);
    }
  }

  const handleConfirm = async () => {
    if (!billboard) return;

    let updateBillboardReq: UpdateBillboardReq = {
      ...billboard,
      updateUploadFileReq: {
        ...billboard.uploadFile,
        uploadFileId: billboard.uploadFile.id
      }
    }
    try {
      if (imageChanged) {
        updateBillboardReq = await uploadFileWithLocalUrl(ServiceType.BILLBOARD, updateBillboardReq, aui);
      }
      await updateBillboard(aui, updateBillboardReq);
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  };

  return (
    <MoleculeImgDivContainer
      backgroundImg={convertS3UrlToCloudFrontUrl(billboard.uploadFile.originUrl)}
      handleChange={handleImageChange}
      StyledImgDivContainer={Container}
    >
      <MoleculeInputDiv
        value={billboard.title}
        placeholder={"title"}
        handleChange={(e) => handleChange({ title: e.target.value })}
        inputStyle={InputBillboard}
        StyledDiv={Title}
      />
      <MoleculeTextareaDescription
        value={billboard.description}
        handleChange={(e) => handleChange({ description: e.target.value })}
        alignment={TextAlignment.LEFT}
        StyledTextarea={TextAreaBillboard}
        StyledDescription={Description}
      />
      {isEditMode && hasChanged &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
    </MoleculeImgDivContainer>
  );
};

const Container = styled.div<StyledImgDivContainerProps>`
  position: relative;

  background-image: url(${props => props.$backgroundImg});
  background-size: cover;
  background-position: center;

  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px 6vw;
`;

const Title = styled.div`
  width: 70%;
  padding: 6px 0px;
  margin-bottom: 20px;
  ${({ theme }) => theme.typography.H_01};
`;

const Description = styled.div`
width: 60%;;
min-height: 10vh;
padding: 8px 0px;
margin-bottom: 20px;
${({ theme }) => theme.typography.Body_01_1};
`;


export default Billboard;
