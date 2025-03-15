import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../shared/hooks/useApi/useAuth';
import { AlertPosition, AlertType, ModalType, TempAlertPosition, TempAlertType } from '../../shared/enum/EnumRepository';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import MoleculeDivBtn from '../../shared/component/molecule/MoleculeDivBtn';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { useMember } from '../../shared/hooks/useApi/useMember';
import { UpdateMemberReq } from '../../shared/dto/ReqDtoRepository';
import { useAui } from '../../shared/hooks/useAui';
import { BtnFloatSmall } from '../../shared/component/headless/button/BtnBody';
import { useTempAlertStore } from '../../shared/store/portal/tempAlertStore';
import HeadlessIconBtn from '../../shared/component/headless/button/HeadlessIconBtn';
import copyIcon from '../../asset/icon/copy.png';

const MemberSetting: React.FC = () => {
  const { user } = useAuth();
  const { setStandardModal } = useModalStore();
  const { setTempAlert } = useTempAlertStore();
  const { updateMember } = useMember();
  const { aui } = useAui();


  if (!user) return null;

  const handleCopyAui = () => {
    navigator.clipboard.writeText(user.aui);
    setTempAlert({
      type: TempAlertType.UPDATED,
      position: TempAlertPosition.RB,
      content: "Copy complete.",
      duration: 2500
    });
  }

  const handleChangeUsername = () => {
    setStandardModal({
      modalType: ModalType.CHANGE_STATION,
      title: "Username",
      value: user.username,
      handleChange: (value: string) => handleUpdateMember('username', value)
    });
  }

  const handleUpdateMember = async (field: keyof UpdateMemberReq, value: string | boolean) => {
    await updateMember(aui, {
      ...user,
      [field]: value
    });
  }

  const handleChangePw = () => {
    setStandardModal({
      modalType: ModalType.CHANGE_PW,
      title: "Password",
      value: "",
      handleChange: () => { }
    });
  }

  return (
    <MemberSettingComp>
      <Title>Profile</Title>
      <SubContainer>
        <SubWrapper>
          <SubTitle>Username</SubTitle>
          <MoleculeDivBtn
            value={user.username}
            defaultValue={user.username}
            handleClick={handleChangeUsername}
            DivChangeStyle={SubValueChange}
            DivStyle={SubValue}
            StyledBtn={SubValueBtn}
          />
        </SubWrapper>
        <SubWrapper>
          <SubTitle>AUI (Artist Unique Id)</SubTitle>
          <SubValue>{user.aui}
            <HeadlessIconBtn
              icon={copyIcon}
              handleClick={handleCopyAui}
              StyledBtn={BtnFloatSmall}
            /></SubValue>
        </SubWrapper>
        <SubWrapper>
          <SubTitle>Email</SubTitle>
          <SubValue>{user.email}</SubValue>
        </SubWrapper>
        <SubWrapper>
          <SubTitle>Password</SubTitle>
          <MoleculeDivBtn
            value={""}
            defaultValue={"********"}
            handleClick={handleChangePw}
            DivChangeStyle={SubValueChange}
            DivStyle={SubValue}
            StyledBtn={SubValueBtn}
          />
        </SubWrapper>
      </SubContainer>
    </MemberSettingComp>
  );
}

const MemberSettingComp = styled.section`
  width: 55%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  width: fit-content;
  border-bottom: 1.6px solid ${({ theme }) => theme.colors.color_Gray_02};

  padding: 12px 0px;
  padding-right: 5px;
  margin-bottom: 14px;
  ${({ theme }) => theme.typography.Body_01_1};
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
export const SubWrapper = styled.div`

`;

export const SubTitle = styled.div`
  width: fit-content;
  padding: 4px 0px;
  ${({ theme }) => theme.typography.Body_02_1};
`;


export const SubBtnValue = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubValue = styled.div`
  width: fit-content;
  padding: 8px 0px;
  ${({ theme }) => theme.typography.Body_03_2};
`;

export const SubValueChange = styled.div`
  width: 100%;
  padding: 8px 0px;
  
  border-bottom: 1px solid ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_03_2};
`;

export const SubValueBtn = styled.button`
  width: fit-content;
  padding: 8px;
  cursor: pointer;
  border-radius: 1px;
  color: ${({ theme }) => theme.colors.color_Gray_06};
  background-color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_03_2};
`;



export default MemberSetting;