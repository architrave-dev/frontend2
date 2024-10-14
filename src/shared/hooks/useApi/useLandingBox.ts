import { useState } from 'react';
import { LandingBoxData, useLandingBoxStore } from '../../store/landingBoxStore';
import { LandingBoxResponse, getLandingBox, updateLandingBox } from '../../api/landingBoxApi';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';


interface UseLandingBoxResult {
  isLoading: boolean;
  landingBox: LandingBoxData | null;
  getLandingBox: (aui: string) => Promise<void>;
  updateLandingBox: (aui: string, data: LandingBoxData) => Promise<void>;
}

export const useLandingBox = (): UseLandingBoxResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { landingBox, setLandingBox } = useLandingBoxStore();

  const handleLandingBoxSuccess = (response: LandingBoxResponse) => {
    const landingBoxData = response.data;
    setLandingBox(landingBoxData);
  };

  const handleLandingBoxRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: LandingBoxData
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      if (!data) {
        const response = await getLandingBox(aui);
        handleLandingBoxSuccess(response);
      } else {
        const response = await updateLandingBox(aui, data);
        handleLandingBoxSuccess(response);
      }

    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleLandingBoxRequest(aui, action, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getLandingBoxHandler = (aui: string) => handleLandingBoxRequest(aui, 'get');
  const updateLandingBoxHandler = (aui: string, data: LandingBoxData) => handleLandingBoxRequest(aui, 'update', data);

  return {
    isLoading,
    landingBox,
    getLandingBox: getLandingBoxHandler,
    updateLandingBox: updateLandingBoxHandler
  };
}