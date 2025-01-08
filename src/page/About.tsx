import React from 'react';
import styled from 'styled-components';
import MemberInfo from '../component/about/MemberInfo';
import CareerList from '../component/about/CareerList';
import { useInitPage } from '../shared/hooks/useInitPage';
import { useEditMode } from '../shared/hooks/useEditMode';
import { useMemberInfo } from '../shared/hooks/useApi/useMemberInfo';
import { useMemberInfoStoreForUpdate } from '../shared/store/memberInfoStore';
import { useCareerListStoreForUpdate } from '../shared/store/careerStore';
import HeadlessBtn from '../shared/component/headless/button/HeadlessBtn';
import { BtnConfirm } from '../shared/component/headless/button/BtnBody';
import { isModified } from '../shared/hooks/useIsModified';
import { UpdateMemberInfoReq, UpdatedCareerListReq } from '../shared/dto/ReqDtoRepository';
import { useCareer } from '../shared/hooks/useApi/useCareer';
import { useAui } from '../shared/hooks/useAui';
import { ServiceType } from '../shared/enum/EnumRepository';
import { ErrorCode } from '../shared/api/errorCode';
import { base64ToFileWithMime, uploadToS3 } from '../shared/aws/s3Upload';
import { useLoadingStore } from '../shared/store/loadingStore';
import Loading from '../shared/component/Loading';


const About: React.FC = () => {
  useInitPage();
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { memberInfo, updateMemberInfo } = useMemberInfo();
  const { updateMemberInfoDto } = useMemberInfoStoreForUpdate();
  const { updateCareerList } = useCareer();
  const { createdCareers, updatedCareers, removedCareers } = useCareerListStoreForUpdate();
  const { isLoading } = useLoadingStore();

  const memberInfoCheck = (): boolean => {
    if (!memberInfo || !updateMemberInfoDto) {
      return false;
    }
    return isModified(memberInfo, updateMemberInfoDto);
  }

  const careerListCheck = (): boolean => {
    return (
      createdCareers.length > 0 ||
      updatedCareers.length > 0 ||
      removedCareers.length > 0
    );
  }

  const isUnitedChanged = (): boolean => {
    return memberInfoCheck() || careerListCheck();
  }

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

  const imageChecker = () => {
    if (!memberInfo) return;
    if (!updateMemberInfoDto) return;
    return memberInfo.uploadFile.originUrl !== updateMemberInfoDto.uploadFile.originUrl;
  }

  const handleConfirm = async () => {
    try {
      if (memberInfoCheck()) {
        if (!updateMemberInfoDto) return;

        let updateMemberInfoReq: UpdateMemberInfoReq = {
          ...updateMemberInfoDto,
          updateUploadFileReq: {
            ...updateMemberInfoDto.uploadFile,
            uploadFileId: updateMemberInfoDto.uploadFile.id
          }
        }
        if (imageChecker()) {
          updateMemberInfoReq = await uploadFileWithLocalUrl(ServiceType.MEMBER_INFO, updateMemberInfoReq, aui);
        }
        await updateMemberInfo(aui, updateMemberInfoReq);
      }
      if (careerListCheck()) {
        const updatedData: UpdatedCareerListReq = {
          createCareerReqList: createdCareers,
          updateCareerReqList: updatedCareers,
          removeCareerReqList: removedCareers
        }
        await updateCareerList(aui, updatedData);
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
      {isEditMode && isUnitedChanged() &&
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