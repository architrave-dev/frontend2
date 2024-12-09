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
import { UpdatedCareerListReq } from '../shared/dto/ReqDtoRepository';
import { useCareer } from '../shared/hooks/useApi/useCareer';
import { useAui } from '../shared/hooks/useAui';


const About: React.FC = () => {
  useInitPage();
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { memberInfo, updateMemberInfo } = useMemberInfo();
  const { updateMemberInfoDto } = useMemberInfoStoreForUpdate();
  const { updateCareerList } = useCareer();
  const { createdCareers, updatedCareers, removedCareers } = useCareerListStoreForUpdate();

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

  const handleConfirm = async () => {
    try {
      if (memberInfoCheck()) {
        await updateMemberInfo(aui, updateMemberInfoDto!);
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