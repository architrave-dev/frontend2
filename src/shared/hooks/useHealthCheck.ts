import { useEffect } from 'react';
import { healthCheck } from '../api/healthCheckApi';

export const useHealthCheck = () => {
  useEffect(() => {
    const healthCheckWithApi = async () => {
      try {
        console.log("do Health Check...")
        await healthCheck();
      } catch (error) { }
    }
    healthCheckWithApi();
  }, []);
};