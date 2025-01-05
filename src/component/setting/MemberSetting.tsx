import React from 'react';
import styled from 'styled-components';
import Loading from '../../shared/component/Loading';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { useAuth } from '../../shared/hooks/useApi/useAuth';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { AlertPosition, AlertType } from '../../shared/enum/EnumRepository';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';

const MemberSetting: React.FC = () => {
  const { isLoading, user } = useAuth();
  const { isEditMode } = useEditMode();
  const { setStandardAlert } = useStandardAlertStore();

  const handleChangePw = () => {
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "In Preparation..."
    })
  }
  // 로딩 상태를 처리합니다.
  if (isLoading) return <Loading />;
  if (!user) return null;

  return (
    <MemberSettingComp>
      <Title>Profile</Title>
      <SubContainer>
        <SubWrapper>
          <SubTitle>Username</SubTitle>
          <SubValue>{user.aui}</SubValue>
        </SubWrapper>
        <SubWrapper>
          <SubTitle>AUI (Artist Unique Id)</SubTitle>
          <SubValue>{user.aui}</SubValue>
        </SubWrapper>
        <SubWrapper>
          <SubTitle>Email</SubTitle>
          <SubValue>{user.email}</SubValue>
        </SubWrapper>
        <SubWrapper>
          <SubTitle>Password</SubTitle>
          <SubBtnValue>
            {isEditMode ?
              <>
                <SubValueChange>********</SubValueChange>
                <HeadlessBtn
                  value={"Change"}
                  handleClick={handleChangePw}
                  StyledBtn={SubValueBtn}
                />
              </>
              :
              <SubValue>********</SubValue>
            }
          </SubBtnValue>
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