import { create } from 'zustand';
import { ContactPropertyVisibleData } from '../dto/EntityRepository';

interface ContactPropertyVisibleState {
  contactPropertyVisible: ContactPropertyVisibleData | null;
  setContactPropertyVisible: (value: ContactPropertyVisibleData) => void;
}

export const useContactPropertyVisibleStore = create<ContactPropertyVisibleState>((set) => ({
  contactPropertyVisible: null,
  setContactPropertyVisible: (value) => set({ contactPropertyVisible: value }),
}));