import { create } from 'zustand';
import { SettingData } from '../dto/EntityRepository';

interface SettingState {
  setting: SettingData | null;
  setSetting: (value: SettingData) => void;
}

export const useSettingStore = create<SettingState>((set) => ({
  setting: null,
  setSetting: (value) => set({ setting: value }),
}));

interface SettingStateForUpdate {
  updateSettingDto: SettingData | null;
  setUpdateSettingDto: (updateSettingDto: SettingData) => void;
}

export const useSettingStoreForUpdate = create<SettingStateForUpdate>((set) => ({
  updateSettingDto: null,
  setUpdateSettingDto: (updateSettingDto) => set({ updateSettingDto })
}));