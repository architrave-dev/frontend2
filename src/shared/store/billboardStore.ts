import { create } from 'zustand';
import { BillboardData } from '../dto/EntityRepository';

interface BillboardState {
  billboard: BillboardData | null;
  hasChanged: boolean;
  imageChanged: boolean;
  setBillboard: (value: BillboardData) => void;
  updateBillboard: (updates: Partial<BillboardData>) => void;
  updateImage: (originUrl: string) => void;
}

export const useBillboardStore = create<BillboardState>((set) => ({
  billboard: null,
  hasChanged: false,
  imageChanged: false,
  setBillboard: (billboard) => set({ billboard, hasChanged: false, imageChanged: false }),
  updateBillboard: (updates) =>
    set(({ billboard }) => ({
      billboard: billboard ?
        { ...billboard, ...updates }
        : null,
      hasChanged: true
    })),

  updateImage: (originUrl: string) =>
    set(({ billboard }) => ({
      billboard: billboard ? {
        ...billboard,
        uploadFile: {
          ...billboard.uploadFile,
          originUrl,
        }
      } : null,
      hasChanged: true,
      imageChanged: true,
    })),
}));