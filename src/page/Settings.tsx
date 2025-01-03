import React from 'react';
import styled from 'styled-components';
import { useInitPage } from '../shared/hooks/useInitPage';
import { useAui } from '../shared/hooks/useAui';
import { useEditMode } from '../shared/hooks/useEditMode';
import { isModified } from '../shared/hooks/useIsModified';
import { BtnConfirm } from '../shared/component/headless/button/BtnBody';
import HeadlessBtn from '../shared/component/headless/button/HeadlessBtn';


const Settings: React.FC = () => {
  useInitPage();
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();

  const settingsCheck = (): boolean => {
    // if (!settings || !updateSettingsDto) {
    //   return false;
    // }
    // return isModified(Settings, updateSettingsDto);
    return true;
  }


  const handleConfirm = async () => {
    // try {
    //   if (settingsCheck()) {
    //     // if (!updateSettingsDto) return;
    //     // const haha: UpdateSettingsReq = {
    //     //   ...updateSettingsDto,
    //     //   twitter: updateSettingsDto.sns.twitter,
    //     //   instagram: updateSettingsDto.sns.instagram,
    //     //   facebook: updateSettingsDto.sns.facebook,
    //     //   threads: updateSettingsDto.sns.threads,
    //     //   behance: updateSettingsDto.sns.behance,
    //     //   youtube: updateSettingsDto.sns.youtube,
    //     //   vimeo: updateSettingsDto.sns.vimeo,
    //     //   url1: updateSettingsDto.sns.url1,
    //     // }

    //     await updateSettings(aui, haha);
    //   }
    // } catch (err) {
    // } finally {
    //   setEditMode(false);
    // }
  };

  return (
    <SettingsContainer>
      this is setting page!!
      {isEditMode && settingsCheck() &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
    </SettingsContainer>
  );
}

export default Settings;


const SettingsContainer = styled.div`
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