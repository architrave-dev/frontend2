import { useState } from 'react';
import { useBillboardStore, useBillboardStoreForUpdate } from '../../store/billboardStore';
import { getBillboard, updateBillboard } from '../../api/billboardApi';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { BillboardData } from '../../dto/EntityRepository';
import { BillboardResponse } from '../../dto/ResDtoRepository';
import { UpdateBillboardReq } from '../../dto/ReqDtoRepository';


interface UseBillboardResult {
  isLoading: boolean;
  billboard: BillboardData | null;
  getBillboard: (aui: string) => Promise<void>;
  updateBillboard: (aui: string, data: UpdateBillboardReq) => Promise<void>;
}

export const useBillboard = (): UseBillboardResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { billboard, setBillboard } = useBillboardStore();
  const { setUpdateBillboardDto } = useBillboardStoreForUpdate();

  const handleGetBillboardSuccess = (response: BillboardResponse) => {
    const billboardData = response.data;
    setBillboard(billboardData);
    setUpdateBillboardDto(billboardData);
  };

  const handleUpdateBillboardSuccess = async (response: BillboardResponse) => {
    const billboardData = response.data;
    setBillboard(billboardData);
    setUpdateBillboardDto(billboardData);
  };

  const handleBillboardRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: UpdateBillboardReq
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'update':
          await handleUpdateBillboardSuccess(await updateBillboard(aui, data as UpdateBillboardReq));
          break;
        case 'get':
        default:
          handleGetBillboardSuccess(await getBillboard(aui));
          break;
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleBillboardRequest(aui, action, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getBillboardHandler = (aui: string) => handleBillboardRequest(aui, 'get');
  const updateBillboardHandler = (aui: string, data: UpdateBillboardReq) => handleBillboardRequest(aui, 'update', data);

  return {
    isLoading,
    billboard,
    getBillboard: getBillboardHandler,
    updateBillboard: updateBillboardHandler
  };
}