import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useInitPage } from '../shared/hooks/useInitPage';
import MemberSetting from '../component/setting/MemberSetting';
import PageSetting from '../component/setting/PageSetting';
import Subscription from '../component/setting/Subscription';
import Loading from '../shared/component/Loading';
import { useLoadingStore } from '../shared/store/loadingStore';
import { isLoggedInOwner } from '../shared/util/isLoggedInOwner';
import { useStandardAlertStore } from '../shared/store/portal/alertStore';
import { AlertPosition } from '../shared/enum/EnumRepository';
import { AlertType } from '../shared/enum/EnumRepository';


const Settings: React.FC = () => {
  const { AUI } = useInitPage();
  const navigate = useNavigate();
  const { isLoading } = useLoadingStore();
  const { setStandardAlert } = useStandardAlertStore();

  useEffect(() => {
    if (!isLoggedInOwner(AUI)) {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "Unauthorized access.",
        callBack: () => {
          navigate(`/`);
        }
      });
    }
  }, [AUI]);

  return (
    <SettingsContainer>
      <Loading isLoading={isLoading} />
      {isLoggedInOwner(AUI) && (
        <>
          <MemberSetting />
          <PageSetting />
          <Subscription />
        </>
      )}
    </SettingsContainer>
  );
}

export default Settings;


const SettingsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: calc(8vh) calc(6vw);
  padding-top: calc(10vh);

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;