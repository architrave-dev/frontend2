import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useInitPage } from '../shared/hooks/useInitPage';
import { useAui } from '../shared/hooks/useAui';
import MemberSetting from '../component/setting/MemberSetting';
import PageSetting from '../component/setting/PageSetting';
import Subscription from '../component/setting/Subscription';
import { useCheckLoginOwner } from '../shared/hooks/useCheckLoginOwner';
import Loading from '../shared/component/Loading';
import { useLoadingStore } from '../shared/store/loadingStore';


const Settings: React.FC = () => {
  useInitPage();
  const navigate = useNavigate();
  const { aui } = useAui();
  const { isLoading } = useLoadingStore();
  const { isLoggedInOwner } = useCheckLoginOwner();

  if (!isLoggedInOwner()) {
    navigate(`/${aui}`);
  }

  return (
    <SettingsContainer>
      <Loading isLoading={isLoading} />
      <MemberSetting />
      <PageSetting />
      <Subscription />
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