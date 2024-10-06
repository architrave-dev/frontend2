import { create } from 'zustand';


export interface SizeData {
  width: string;
  height: string;
  depth?: string;
}

export interface WorkData {
  id: string;
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  size: SizeData;
  material: string,
  prodYear: string,
  //genre : drawing, painting, Sculpture, Installation, Video, Photo, 
  //Sketch or Research
  //Price: 
}

export interface CreateWorkReq {
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  size: SizeData;
  material: string,
  prodYear: string
}

export interface UpdateWorkReq {
  id: string;
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  size: SizeData;
  material: string,
  prodYear: string
}

interface WorkListState {
  workList: WorkData[];
  setWorkList: (workList: WorkData[]) => void;
}

export const useWorkListStore = create<WorkListState>((set) => ({
  workList: [],
  setWorkList: (workList) => set({ workList }),
}));