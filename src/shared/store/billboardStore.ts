import { create } from 'zustand';
import { BillboardData, UploadFileData } from '../dto/EntityRepository';

interface BillboardState {
  billboard: BillboardData | null;
  hasChanged: boolean;
  imageChanged: boolean;
  setBillboard: (value: BillboardData) => void;
  updatBillboard: (updates: Partial<BillboardData>) => void;
  updateImage: (thumbnailUrl: string, originUrl: string) => void;
}

export const useBillboardStore = create<BillboardState>((set) => ({
  billboard: null,
  hasChanged: false,
  imageChanged: false,
  setBillboard: (value) => set({ billboard: { ...value } }),
  updatBillboard: (updates) =>
    set(({ billboard }) => ({
      billboard: billboard ?
        { ...billboard, ...updates }
        : null,
      hasChanged: true
    })),

  updateImage: (thumbnailUrl: string, originUrl: string) =>
    set(({ billboard }) => ({
      billboard: billboard ? {
        ...billboard,
        uploadFile: {
          ...billboard.uploadFile,
          originUrl,
          thumbnailUrl
        }
      } : null,
      hasChanged: true,
      imageChanged: true,
    })),
}));