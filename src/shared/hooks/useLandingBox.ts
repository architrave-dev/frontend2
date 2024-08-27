import { useState } from 'react';
import { LandingBoxData, useLandingBoxStore } from '../store/landingBoxStore';
import { LandingBoxResponse, getLandingBox, updateLandingBox } from '../api/landingBoxApi';


interface UseLandingBoxResult {
  isLoading: boolean;
  error: string | null;
  landingBox: LandingBoxData | null;
  getLandingBox: (aui: string) => Promise<void>;
  updateLandingBox: (aui: string, data: LandingBoxData) => Promise<void>;
}

export const useLandingBox = (): UseLandingBoxResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { landingBox, setLandingBox } = useLandingBoxStore();

  const handleLandingBoxSuccess = (response: LandingBoxResponse) => {
    const landingBoxData = response.data;
    console.log("landingBoxData from useLandingBox: ", landingBoxData);
    setLandingBox(landingBoxData);
  };

  const handleLandingBoxRequest = async (
    aui: string,
    data?: LandingBoxData
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!data) {
        const response = await getLandingBox(aui);
        handleLandingBoxSuccess(response);
      } else {
        const response = await updateLandingBox(aui, data);
        handleLandingBoxSuccess(response);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getLandingBoxHandler = (aui: string): Promise<void> => handleLandingBoxRequest(aui);
  const updateLandingBoxHandler = (aui: string, data: LandingBoxData): Promise<void> => handleLandingBoxRequest(aui, data);

  return {
    isLoading,
    error,
    landingBox,
    getLandingBox: getLandingBoxHandler,
    updateLandingBox: updateLandingBoxHandler
  };
}