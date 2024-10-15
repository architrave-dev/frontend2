import { create } from 'zustand';
import { CareerType } from '../enum/EnumRepository';


export interface CareerData {
  id: string;
  careerType: CareerType;
  yearFrom: number;
  yearTo: number;
  content: string;
  index: number;
}

export interface CreateCareerReq {
  careerType: CareerType
  yearFrom: number;
  yearTo: number;
  content: string;
}

export interface UpdateCareerReq {
  careerId: string;
  yearFrom: number;
  yearTo: number;
  content: string;
}

export interface RemoveCareerReq {
  careerId: string;
}

interface CareerListState {
  careers: CareerData[];
  setCareers: (careers: CareerData[]) => void;
}

export const useCareerListStore = create<CareerListState>((set) => ({
  careers: [],
  setCareers: (careers) => set({ careers }),
}));

interface CareerListStateForUpdate {
  createdCareers: CreateCareerReq[];
  setCreatedCareers: (createCareers: CreateCareerReq[]) => void;
  updatedCareers: UpdateCareerReq[];
  setUpdatedCareers: (updatedCareers: UpdateCareerReq[]) => void;
  removedCareers: RemoveCareerReq[];
  setRemovedCareers: (removeCareers: RemoveCareerReq[]) => void;
  clearAll: () => void;
}

export const useCareerListStoreForUpdate = create<CareerListStateForUpdate>((set) => ({
  createdCareers: [],
  setCreatedCareers: (createdCareers) => set({ createdCareers }),
  updatedCareers: [],
  setUpdatedCareers: (updatedCareers) => set({ updatedCareers }),
  removedCareers: [],
  setRemovedCareers: (removedCareers) => set({ removedCareers }),
  clearAll: () => set({ createdCareers: [], updatedCareers: [], removedCareers: [] })
}));