import { useEffect } from 'react';
import { useGlobalErrStore } from '../store/errorStore';
import { ErrorCode } from '../api/errorCode';
import { useAuth } from './useApi/useAuth';
import { useStandardAlertStore } from '../store/portal/alertStore';
import { AlertPosition, AlertType, ModalType } from '../enum/EnumRepository';
import { useModalStore } from '../store/portal/modalStore';

export const useGlobalError = () => {
  const { managedErr, clearErr } = useGlobalErrStore();
  const { setStandardAlert } = useStandardAlertStore();
  const { setStandardModal } = useModalStore();
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

  const handleNFR = async () => {
    console.log("handleNFR: There is no data like that!!");
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "No matching data found",
      callBack: () => {
        clearErr();
      }
    });
  }

  const handleNAU = async () => {
    console.log("handleNAU: Wrong Password!!");
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "Authentication failed.",
      callBack: () => {
        clearErr();
      }
    });
  }

  const handleDBE = async () => {
    console.log("handleDBE: Database error!!");
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "Database Connection Error.",
      callBack: () => {
        clearErr();
      }
    });
  }

  const handleAWS = async () => {
    console.log("handleAWS: Something wrong about AWS!!");
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "Something wrong about handling Image.",
      callBack: clearErr
    });
  }
  const handleDUK = async () => {
    console.log("handleDUK: Already existed Object.");
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "Already existed Object.",
      callBack: clearErr
    });
  }
  const handleRVN = async () => {
    console.log("handleRVN: Required value is empty.");
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "Required value is empty.",
      callBack: clearErr
    });
  }

  const handleSFE = async () => {
    console.log("handleSFE: File is too small!!");
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "File is too small. MIN is 50KB",
      callBack: clearErr
    });
  }

  const handleBFE = async () => {
    console.log("handleBFE: File is too big!!");
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "File is too big. MAX is 10MB",
      callBack: clearErr
    });
  }

  const handleNCE = async () => {
    console.log("handleNCE: Network connection error!!");
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "Network error. Please check your internet and try again.",
      callBack: clearErr
    });
  }

  const handleSDN = async () => {
    console.log("handleSDN: Server Down!!");
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "Server is not available. Try again later.",
      callBack: clearErr
    });
  }

  const handleEME = async () => {
    console.log("handleEME: Email send error!!");
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "Email send error.",
      callBack: clearErr
    });
  }

  const handleEVF = async () => {
    console.log("handleEVF: Email verification failed!!");
    setStandardAlert({
      type: AlertType.ALERT,
      position: AlertPosition.TOP,
      content: "Email address is not valid.",
      callBack: clearErr
    });
  }

  const handleMPA = async () => {
    console.log("handleMPA: Email Verification");
    setStandardModal({
      modalType: ModalType.VERIFICATION,
      title: null,
      value: null,
      handleChange: () => { }
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
      case ErrorCode.NFR:
        await handleNFR();
        break;
      case ErrorCode.NAU:
        await handleNAU();
        break;
      case ErrorCode.DBE:
        await handleDBE();
        break;
      case ErrorCode.AWS:
        await handleAWS();
        break;
      case ErrorCode.DUK:
        await handleDUK();
        break;
      case ErrorCode.RVN:
        await handleRVN();
        break;
      case ErrorCode.SFE:
        await handleSFE();
        break;
      case ErrorCode.BFE:
        await handleBFE();
        break;
      case ErrorCode.NCE:
        await handleNCE();
        break;
      case ErrorCode.SDN:
        await handleSDN();
        break;
      case ErrorCode.EME:
        await handleEME();
        break;
      case ErrorCode.EVF:
        await handleEVF();
        break;
      case ErrorCode.MPA:
        await handleMPA();
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