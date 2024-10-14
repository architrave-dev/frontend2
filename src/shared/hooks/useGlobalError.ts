import { useEffect } from 'react';
import { useGlobalErrStore } from '../store/errorStore';
import { ErrorCode } from '../api/errorCode';
import { useAuth } from './useApi/useAuth';
import { AlertPosition, AlertType, useStandardAlertStore } from '../store/portal/alertStore';

export const useGlobalError = () => {
  const { managedErr, clearErr } = useGlobalErrStore();
  const { setStandardAlert } = useStandardAlertStore();
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
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "Please Re Login.",
      callBack: () => {
        logout();
        clearErr();
      }
    });
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
        setStandardAlert({
          type: AlertType.ALERT,
          position: AlertPosition.TOP,
          content: "이상한 에러 발생.",
          callBack: clearErr
        })
        return;
    }
  }

  useEffect(() => {
    handleGlobalErr();
  }, [managedErr]);

}