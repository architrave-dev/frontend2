import { create } from 'zustand';
import { ContactData, SocialMedia } from '../dto/EntityRepository';


interface ContactState {
  contact: ContactData | null;
  hasChanged: boolean;
  setContact: (contact: ContactData) => void;
  updateContact: (updates: Partial<ContactData>) => void;
  updateSns: (updates: Partial<SocialMedia>) => void;
}

export const useContactStore = create<ContactState>((set) => ({
  contact: null,
  hasChanged: false,
  setContact: (contact) => set({ contact }),
  updateContact: (updates) =>
    set(({ contact }) => ({
      contact: contact ?
        { ...contact, ...updates }
        : null,
      hasChanged: true
    })),
  updateSns: (updates) =>
    set(({ contact }) => ({
      contact: contact ? {
        ...contact,
        sns: {
          ...contact.sns,
          ...updates
        }
      } : null,
      hasChanged: true,
    })),
}));