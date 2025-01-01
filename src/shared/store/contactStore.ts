import { create } from 'zustand';
import { ContactData } from '../dto/EntityRepository';


interface ContactState {
  contact: ContactData | null;
  setContact: (contact: ContactData) => void;
}

export const useContactStore = create<ContactState>((set) => ({
  contact: null,
  setContact: (contact) => set({ contact }),
}));

interface ContactStateForUpdate {
  updateContactDto: ContactData | null;
  setUpdateContactDto: (updateContactDto: ContactData) => void;
}

export const useContactStoreForUpdate = create<ContactStateForUpdate>((set) => ({
  updateContactDto: null,
  setUpdateContactDto: (updateContactDto) => set({ updateContactDto })
}));