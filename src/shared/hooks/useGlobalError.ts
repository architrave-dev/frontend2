import { useEffect } from 'react';
import { useGlobalErrStore } from '../store/errorStore';
import { ErrorCode } from '../api/errorCode';
import { useAuth } from './useAuth';

export const useGlobalError = () => {
  const { managedErr, clearErr } = useGlobalErrStore();
  const { refresh, logout } = useAuth();


  //ErrorCode.ATX 일 때, 실행
  const handleATX = async () => {
    console.log("handleATX: refresh it!!");
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken != null) {
      try {
        await refresh({ refreshToken });
        if (managedErr?.retryFunction) {
          console.log("rerun");
          await managedErr.retryFunction();
        }
      } catch (error) {
        //do nothing
      } finally {
        clearErr();
      }
    }
  }

  const handleRTX = async () => {
    console.log("handleRTX: refresh failed!!");
    alert("Please Re Login.")
    logout();
    clearErr();
  }

  const handleGlobalErr = async () => {
    if (managedErr === null) {
      return;
    }
    console.log("errCode: ", managedErr.errCode);
    switch (managedErr.errCode) {
      case ErrorCode.RTX:
        await handleRTX();
        break;
      case ErrorCode.ATX:
        await handleATX();
        break;
      case ErrorCode.WEF:
      default:
        alert("이상한 에러 발생");
        clearErr();
        return;
    }
  }

  useEffect(() => {
    handleGlobalErr();
  }, [managedErr]);

}