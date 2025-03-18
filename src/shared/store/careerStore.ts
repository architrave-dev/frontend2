import { create } from 'zustand';
import { CareerData } from '../dto/EntityRepository';

interface CareerListState {
  careers: CareerData[];
  setCareers: (careers: CareerData[]) => void;
  updateCareer: (id: string, updates: Partial<CareerData>) => void;
  afterCreateCareer: (career: CareerData) => void;
  afterUpdateCareer: (updatedCareer: CareerData) => void;
  afterDeleteCareer: (id: string) => void;
}

export const useCareerListStore = create<CareerListState>((set) => ({
  careers: [],
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
  afterCreateCareer: (career) =>
    set(({ careers }) => ({
      careers: [...careers, { ...career, hasChanged: false }]
    })),
  afterUpdateCareer: (updatedCareer) =>
    set(({ careers }) => ({
      careers: careers.map((c) => c.id === updatedCareer.id ? updatedCareer : c)
    })),
  afterDeleteCareer: (id) =>
    set(({ careers }) => ({
      careers: careers.filter((pi) => pi.id !== id)
    }))
}));