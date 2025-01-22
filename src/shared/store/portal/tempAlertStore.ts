import { create } from 'zustand';
import { TempAlertPosition, TempAlertType } from '../../enum/EnumRepository';


export interface TempAlert {
  type: TempAlertType;
  position: TempAlertPosition;
  content: string;
  duration: number;
  callBack?: () => void;
}

interface tempAlertState {
  tempAlert: TempAlert | null;
  setTempAlert: (tempAlert: TempAlert) => void;
  setUpdatedTempAlert: () => void;
  setDeletedTempAlert: () => void;
  clearTempAlert: () => void;
}

export const useTempAlertStore = create<tempAlertState>((set) => ({
  tempAlert: null,
  setTempAlert: (tempAlert: TempAlert) => set({ tempAlert }),
  setUpdatedTempAlert: () => set({
    tempAlert: {
      type: TempAlertType.UPDATED,
      position: TempAlertPosition.RB,
      content: "Updated successfully.",
      duration: 2500
    }
  }),
  setDeletedTempAlert: () => set({
    tempAlert: {
      type: TempAlertType.UPDATED,
      position: TempAlertPosition.RB,
      content: "Deleted successfully.",
      duration: 2500
    }
  }),
  clearTempAlert: () => set({ tempAlert: null })
}));
