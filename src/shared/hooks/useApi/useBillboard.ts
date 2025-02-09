import { useBillboardStore } from '../../store/billboardStore';
import { getBillboard, updateBillboard } from '../../api/billboardApi';
import { BillboardData } from '../../dto/EntityRepository';
import { BillboardResponse } from '../../dto/ResDtoRepository';
import { UpdateBillboardReq } from '../../dto/ReqDtoRepository';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { useApiWrapper } from './apiWrapper';

interface UseBillboardResult {
  billboard: BillboardData | null;
  getBillboard: (aui: string) => Promise<void>;
  updateBillboard: (aui: string, data: UpdateBillboardReq) => Promise<void>;
}

export const useBillboard = (): UseBillboardResult => {
  const { billboard, setBillboard } = useBillboardStore();
  const { setUpdatedTempAlert } = useTempAlertStore();
  const withApiHandler = useApiWrapper();

  const handleGetBillboardSuccess = (response: BillboardResponse) => {
    const billboardData = response.data;
    setBillboard(billboardData);
  };

  const handleUpdateBillboardSuccess = async (response: BillboardResponse) => {
    const billboardData = response.data;
    setBillboard(billboardData);
    setUpdatedTempAlert();
  };

  const handleBillboardRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: UpdateBillboardReq
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'update':
          return handleUpdateBillboardSuccess(await updateBillboard(aui, data as UpdateBillboardReq));
        case 'get':
        default:
          return handleGetBillboardSuccess(await getBillboard(aui));
      }
    };

    await withApiHandler(apiFunction, [aui, action, data]);
  };

  const getBillboardHandler = (aui: string) => handleBillboardRequest(aui, 'get');
  const updateBillboardHandler = (aui: string, data: UpdateBillboardReq) => handleBillboardRequest(aui, 'update', data);

  return {
    billboard,
    getBillboard: getBillboardHandler,
    updateBillboard: updateBillboardHandler
  };
}