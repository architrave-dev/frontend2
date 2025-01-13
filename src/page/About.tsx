import React from 'react';
import styled from 'styled-components';
import MemberInfo from '../component/about/MemberInfo';
import CareerList from '../component/about/CareerList';
import { useInitPage } from '../shared/hooks/useInitPage';
import { useEditMode } from '../shared/hooks/useEditMode';
import { useMemberInfo } from '../shared/hooks/useApi/useMemberInfo';
import HeadlessBtn from '../shared/component/headless/button/HeadlessBtn';
import { BtnConfirm } from '../shared/component/headless/button/BtnBody';
import { UpdateMemberInfoReq } from '../shared/dto/ReqDtoRepository';
import { useAui } from '../shared/hooks/useAui';
import { ServiceType } from '../shared/enum/EnumRepository';
import { ErrorCode } from '../shared/api/errorCode';
import { base64ToFileWithMime, uploadToS3 } from '../shared/aws/s3Upload';
import { useLoadingStore } from '../shared/store/loadingStore';
import Loading from '../shared/component/Loading';
import { useMemberInfoStore } from '../shared/store/memberInfoStore';


const About: React.FC = () => {
  useInitPage();
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { memberInfo, updateMemberInfo } = useMemberInfo();
  const { hasChanged: memberInfoChanged, imageChanged } = useMemberInfoStore();
  const { isLoading } = useLoadingStore();


  const uploadFileWithLocalUrl = async (serviceType: ServiceType, prevData: UpdateMemberInfoReq, aui: string): Promise<UpdateMemberInfoReq> => {
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
    try {
      if (memberInfoChanged) {
        if (!memberInfo) return;

        let updateMemberInfoReq: UpdateMemberInfoReq = {
          ...memberInfo,
          updateUploadFileReq: {
            ...memberInfo.uploadFile,
            uploadFileId: memberInfo.uploadFile.id
          }
        }
        if (imageChanged) {
          updateMemberInfoReq = await uploadFileWithLocalUrl(ServiceType.MEMBER_INFO, updateMemberInfoReq, aui);
        }
        await updateMemberInfo(aui, updateMemberInfoReq);
      }
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  };


  return (
    <AboutContainer>
      <Loading isLoading={isLoading} />
      <MemberInfo />
      <CareerList />
      {isEditMode && memberInfoChanged &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
    </AboutContainer>
  );
}

export default About;


const AboutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: calc(8vh) calc(6vw);

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;