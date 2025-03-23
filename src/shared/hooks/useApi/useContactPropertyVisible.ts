import { useContactPropertyVisibleStore } from '../../store/contactPropertyVisibleStore';
import { getContactPropertyVisible, updateContactPropertyVisible } from '../../api/contactPropertyVisibleApi';
import { ContactPropertyVisibleData } from '../../dto/EntityRepository';
import { ContactPropertyVisibleResponse } from '../../dto/ResDtoRepository';
import { UpdateContactPropertyVisibleReq } from '../../dto/ReqDtoRepository';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';

interface UseContactPropertyVisibleResult {
  contactPropertyVisible: ContactPropertyVisibleData | null;
  getContactPropertyVisible: (aui: string) => Promise<void>;
  updateContactPropertyVisible: (aui: string, data: UpdateContactPropertyVisibleReq) => Promise<void>;
}

export const useContactPropertyVisible = (): UseContactPropertyVisibleResult => {
  const { contactPropertyVisible, setContactPropertyVisible } = useContactPropertyVisibleStore();
  const { setUpdatedTempAlert } = useTempAlertStore();
  const withApiHandler = useApiWrapper();

  const handleSuccess = (response: ContactPropertyVisibleResponse) => {
    const contactPropertyVisible = response.data;
    setContactPropertyVisible(contactPropertyVisible);
  };
  const handleUpdateSuccess = (response: ContactPropertyVisibleResponse) => {
    const contactPropertyVisible = response.data;
    setContactPropertyVisible(contactPropertyVisible);
    setUpdatedTempAlert();
  };

  const handleContactPropertyVisibleRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: UpdateContactPropertyVisibleReq | string
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'update':
          return handleUpdateSuccess(await updateContactPropertyVisible(aui, data as UpdateContactPropertyVisibleReq));
        case 'get':
        default:
          return handleSuccess(await getContactPropertyVisible(aui));
      }
    };

    await withApiHandler(apiFunction, [aui, action, data]);
  };


  const getContactPropertyVisibleHandler = (aui: string) => handleContactPropertyVisibleRequest(aui, 'get');
  const updateContactPropertyVisibleHandler = (aui: string, data: UpdateContactPropertyVisibleReq) => handleContactPropertyVisibleRequest(aui, 'update', data);

  return {
    contactPropertyVisible,
    getContactPropertyVisible: getContactPropertyVisibleHandler,
    updateContactPropertyVisible: updateContactPropertyVisibleHandler
  };
}