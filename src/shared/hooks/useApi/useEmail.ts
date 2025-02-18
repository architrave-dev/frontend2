import { sendEmail } from '../../api/emailApi';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';
import { EmailRequest } from '../../dto/ReqDtoRepository';


interface UseEmailResult {
  sendEmail: (aui: string, data: EmailRequest) => Promise<void>;
}

export const useEmail = (): UseEmailResult => {
  const { setUpdatedTempAlert, setDeletedTempAlert } = useTempAlertStore();
  const withApiHandler = useApiWrapper();


  const handleSendEmailSuccess = (response: string) => {
    console.log("response: ", response);
  };

  const handleEmailRequest = async (
    aui: string,
    action: 'send',
    data: EmailRequest
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'send':
        default:
          return handleSendEmailSuccess(await sendEmail(aui, data));
      }
    };

    await withApiHandler(apiFunction, [aui, action, data]);
  };

  const sendEmailHandler = (aui: string, data: EmailRequest) => handleEmailRequest(aui, 'send', data);

  return {
    sendEmail: sendEmailHandler,
  };
};