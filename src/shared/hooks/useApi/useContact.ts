import { ContactData } from '../../dto/EntityRepository';
import { ContactResponse } from '../../dto/ResDtoRepository';
import { UpdateContactReq } from '../../dto/ReqDtoRepository';
import { getContact, updateContact } from '../../api/contactApi';
import { useContactStore } from '../../store/contactStore';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';


interface UseContactResult {
  contact: ContactData | null;
  getContact: (aui: string) => Promise<void>;
  updateContact: (aui: string, data: UpdateContactReq) => Promise<void>;
}

export const useContact = (): UseContactResult => {
  const { contact, setContact } = useContactStore();
  const { setUpdatedTempAlert } = useTempAlertStore();
  const withApiHandler = useApiWrapper();

  const handleContactSuccess = (response: ContactResponse) => {
    const contactData = response.data;
    setContact(contactData);
  };

  const handleUpdateContactSuccess = (response: ContactResponse) => {
    const contactData = response.data;
    setContact(contactData);
    setUpdatedTempAlert();
  };

  const handleContactRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: UpdateContactReq
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'update':
          return handleUpdateContactSuccess(await updateContact(aui, data as UpdateContactReq));
        case 'get':
        default:
          return handleContactSuccess(await getContact(aui));
      }
    };

    await withApiHandler(apiFunction, [aui, action, data]);
  };

  const getContactHandler = (aui: string) => handleContactRequest(aui, 'get');
  const updateContactHandler = (aui: string, data: UpdateContactReq) => handleContactRequest(aui, 'update', data);

  return {
    contact,
    getContact: getContactHandler,
    updateContact: updateContactHandler,
  };
};