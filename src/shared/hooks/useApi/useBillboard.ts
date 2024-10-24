import { useState } from 'react';
import { useBillboardStore, useBillboardStoreForUpdate } from '../../store/billboardStore';
import { getBillboard, updateBillboard } from '../../api/billboardApi';
import { useGlobalErrStore } from '../../store/errorStore';
import { convertStringToErrorCode } from '../../api/errorCode';
import { BillboardData } from '../../dto/EntityRepository';
import { BillboardResponse } from '../../dto/ResDtoRepository';


interface UseBillboardResult {
  isLoading: boolean;
  billboard: BillboardData | null;
  getBillboard: (aui: string) => Promise<void>;
  updateBillboard: (aui: string, data: BillboardData) => Promise<void>;
}

export const useBillboard = (): UseBillboardResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { billboard, setBillboard } = useBillboardStore();
  const { setUpdateBillboardDto } = useBillboardStoreForUpdate();

  const handleBillboardSuccess = (response: BillboardResponse) => {
    const billboardData = response.data;
    setBillboard(billboardData);
    setUpdateBillboardDto(billboardData);
  };

  const handleBillboardRequest = async (
    aui: string,
    action: 'get' | 'update',
    data?: BillboardData
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      if (!data) {
        const response = await getBillboard(aui);
        handleBillboardSuccess(response);
      } else {
        const response = await updateBillboard(aui, data);
        handleBillboardSuccess(response);
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
  const updateBillboardHandler = (aui: string, data: BillboardData) => handleBillboardRequest(aui, 'update', data);

  return {
    isLoading,
    billboard,
    getBillboard: getBillboardHandler,
    updateBillboard: updateBillboardHandler
  };
}