import { useState } from 'react';
import { LandingBoxData, useLandingBoxStore } from '../store/landingBoxStore';
import { LandingBoxResponse, getLandingBox, updateLandingBox } from '../api/landingBoxApi';


interface UseLandingBoxResult {
  isLoading: boolean;
  error: string | null;
  landingBox: LandingBoxData | null;
  getLandingBox: (data: string) => Promise<void>;
  updateLandingBox: (data: LandingBoxData) => Promise<void>;
}

export const useLandingBox = (): UseLandingBoxResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { landingBox, setLandingBox } = useLandingBoxStore();

  const handleLandingBoxSuccess = (response: LandingBoxResponse) => {
    const landingBoxResult = response.data;
    setLandingBox(landingBoxResult);
  };


  const handleLandingBoxRequest = async <T extends string | LandingBoxData>(
    landingBoxFunction: (data: T) => Promise<LandingBoxResponse>,
    data: T
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await landingBoxFunction(data);
      handleLandingBoxSuccess(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getLandingBoxHandler = (data: string) => handleLandingBoxRequest(getLandingBox, data);
  const updateLandingBoxHandler = (data: LandingBoxData) => handleLandingBoxRequest(updateLandingBox, data);

  return {
    isLoading,
    error,
    landingBox,
    getLandingBox: getLandingBoxHandler,
    updateLandingBox: updateLandingBoxHandler
  };
}