import { useState } from 'react';
import { useSettingStore, useSettingStoreForUpdate } from '../../store/settingStore';
import { getSetting, updateSetting } from '../../api/settingApi';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { SettingData } from '../../dto/EntityRepository';
import { SettingResponse } from '../../dto/ResDtoRepository';
import { UpdateSettingReq } from '../../dto/ReqDtoRepository';


interface UseSettingResult {
  isLoading: boolean;
  setting: SettingData | null;
  getSetting: (aui: string) => Promise<void>;
  updateSetting: (aui: string, data: UpdateSettingReq) => Promise<void>;
}

export const useSetting = (): UseSettingResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { setting, setSetting } = useSettingStore();
  const { setUpdateSettingDto } = useSettingStoreForUpdate();

  const handleGetSettingSuccess = (response: SettingResponse) => {
    const settingData = response.data;
    setSetting(settingData);
    setUpdateSettingDto(settingData);
  };

  const handleUpdateSettingSuccess = async (response: SettingResponse) => {
    const settingData = response.data;
    setSetting(settingData);
    setUpdateSettingDto(settingData);
  };

  const handleSettingRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: UpdateSettingReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'update':
          await handleUpdateSettingSuccess(await updateSetting(aui, data as UpdateSettingReq));
          break;
        case 'get':
        default:
          handleGetSettingSuccess(await getSetting(aui));
          break;
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleSettingRequest(aui, action, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getSettingHandler = (aui: string) => handleSettingRequest(aui, 'get');
  const updateSettingHandler = (aui: string, data: UpdateSettingReq) => handleSettingRequest(aui, 'update', data);

  return {
    isLoading,
    setting,
    getSetting: getSettingHandler,
    updateSetting: updateSettingHandler
  };
}