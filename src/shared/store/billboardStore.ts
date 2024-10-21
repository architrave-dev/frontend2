import { create } from 'zustand';
import { BillboardData } from '../dto/EntityRepository';

interface BillboardState {
  billboard: BillboardData | null;
  setBillboard: (value: BillboardData) => void;
}

export const useBillboardStore = create<BillboardState>((set) => ({
  billboard: null,
  setBillboard: (value) => set({ billboard: value }),
}));

interface BillboardStateForUpdate {
  updateBillboardDto: BillboardData | null;
  setUpdateBillboardDto: (updateBillboardDto: BillboardData) => void;
}

export const useBillboardStoreForUpdate = create<BillboardStateForUpdate>((set) => ({
  updateBillboardDto: null,
  setUpdateBillboardDto: (updateBillboardDto) => set({ updateBillboardDto })
}));