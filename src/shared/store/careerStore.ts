import { create } from 'zustand';
import { CareerData } from '../dto/EntityRepository';

interface CareerListState {
  careers: CareerData[];
  setOnlyCareers: (careers: CareerData[]) => void;
  setCareers: (careers: CareerData[]) => void;
  updateCareer: (id: string, updates: Partial<CareerData>) => void;
  afterDeleteCareer: (id: string) => void;
}

export const useCareerListStore = create<CareerListState>((set) => ({
  careers: [],
  setOnlyCareers: (careers) => set({ careers }),
  setCareers: (careers) =>
    set(() => ({
      careers: careers.map((c) => ({ ...c, hasChanged: false })),
    })),
  updateCareer: (id, updates) =>
    set(({ careers }) => ({
      careers: careers.map((c) =>
        c.id === id ?
          { ...c, ...updates, hasChanged: true }
          : c
      ),
    })),
  afterDeleteCareer: (id) =>
    set(({ careers }) => ({
      careers: careers.filter((pi) => pi.id !== id)
    }))
}));