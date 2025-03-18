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
import { StyledImgDivContainerProps } from '../../shared/dto/StyleCompRepository';
import MoleculeTextareaDescription from '../../shared/component/molecule/MoleculeTextareaDescription';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';
import { UpdateBillboardReq } from '../../shared/dto/ReqDtoRepository';
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';
import { useBillboardStore } from '../../shared/store/billboardStore';
import { useImage } from '../../shared/hooks/useApi/useImage';
import OptimizedMoleculeImgDivContainer from '../../shared/component/molecule/OptimizedMoleculeImgDivContainer';


const Billboard: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { billboard, getBillboard, updateBillboard } = useBillboard();
  const { hasChanged, imageChanged,
    updateBillboard: handleChange,
    updateImage: handleImageChange
  } = useBillboardStore();
  const { aui } = useAui();
  const { uploadImage } = useImage();

  useEffect(() => {
    const getBillboardWithApi = async () => {
      if (!aui) return;
      console.log("getting billboard...")
      await getBillboard(aui);
    }
    getBillboardWithApi();
  }, [aui]);

  if (!billboard) { return null; }

  const handleConfirm = async () => {
    if (!billboard || !aui) return;

    const baseRequest: UpdateBillboardReq = {
      ...billboard,
      updateUploadFileReq: {
        ...billboard.uploadFile,
        uploadFileId: billboard.uploadFile.id
      }
    };

    const finalRequest = imageChanged
      ? await uploadImage(aui, ServiceType.BILLBOARD, baseRequest)
      : baseRequest;
    if (!finalRequest) return;

    await updateBillboard(aui, finalRequest as UpdateBillboardReq);
    setEditMode(false);
  };

  return (
    <OptimizedMoleculeImgDivContainer
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
    </OptimizedMoleculeImgDivContainer>
  );
};

const Container = styled.div<StyledImgDivContainerProps>`
  position: relative;

  background-image: url(${props => props.$backgroundImg});
  background-size: cover;
  background-position: center;

  width: 100%;
  height: calc(240vw / 4);
  max-height: 95vh;

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
