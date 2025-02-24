import { useSettingStore } from '../../store/settingStore';
import { getSetting, updateSetting } from '../../api/settingApi';
import { SettingData } from '../../dto/EntityRepository';
import { SettingResponse } from '../../dto/ResDtoRepository';
import { UpdateSettingReq } from '../../dto/ReqDtoRepository';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';

interface UseSettingResult {
  setting: SettingData | null;
  getSetting: (aui: string) => Promise<void>;
  updateSetting: (aui: string, data: UpdateSettingReq) => Promise<void>;
}

export const useSetting = (): UseSettingResult => {
  const { setting, setSetting } = useSettingStore();
  const { setUpdatedTempAlert } = useTempAlertStore();
  const withApiHandler = useApiWrapper();

  const handleGetSettingSuccess = (response: SettingResponse) => {
    const settingData = response.data;
    setSetting(settingData);
  };

  const handleUpdateSettingSuccess = async (response: SettingResponse) => {
    const settingData = response.data;
    setSetting(settingData);
    setUpdatedTempAlert();
  };

  const handleSettingRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: UpdateSettingReq
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'update':
          return handleUpdateSettingSuccess(await updateSetting(aui, data as UpdateSettingReq));
        case 'get':
        default:
          return handleGetSettingSuccess(await getSetting(aui));
      }
    };

    await withApiHandler(apiFunction, [aui, action, data]);
  };

  const getSettingHandler = (aui: string) => handleSettingRequest(aui, 'get');
  const updateSettingHandler = (aui: string, data: UpdateSettingReq) => handleSettingRequest(aui, 'update', data);

  return {
    setting,
    getSetting: getSettingHandler,
    updateSetting: updateSettingHandler
  };
}