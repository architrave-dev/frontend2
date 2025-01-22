import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { ContactData } from '../../dto/EntityRepository';
import { ContactResponse } from '../../dto/ResDtoRepository';
import { UpdateContactReq } from '../../dto/ReqDtoRepository';
import { getContact, updateContact } from '../../api/contactApi';
import { useContactStore } from '../../store/contactStore';
import { useLoadingStore } from '../../store/loadingStore';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';


interface UseContactResult {
  contact: ContactData | null;
  getContact: (aui: string) => Promise<void>;
  updateContact: (aui: string, data: UpdateContactReq) => Promise<void>;
}

export const useContact = (): UseContactResult => {
  const { setIsLoading } = useLoadingStore();
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { contact, setContact } = useContactStore();
  const { setUpdatedTempAlert } = useTempAlertStore();

  const handleUpdateContactSuccess = (response: ContactResponse) => {
    const contactData = response.data;
    setContact(contactData);
    setUpdatedTempAlert();
  };

  const handleContactSuccess = (response: ContactResponse) => {
    const contactData = response.data;
    setContact(contactData);
  };

  const handleContactRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: UpdateContactReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      if (!data) {
        const response = await getContact(aui);
        handleContactSuccess(response);
      } else {
        const response = await updateContact(aui, data as UpdateContactReq);
        handleUpdateContactSuccess(response);
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleContactRequest(aui, action, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getContactHandler = (aui: string) => handleContactRequest(aui, 'get');
  const updateContactHandler = (aui: string, data: UpdateContactReq) => handleContactRequest(aui, 'update', data);


  return {
    contact,
    getContact: getContactHandler,
    updateContact: updateContactHandler,
  };
};