import { create } from 'zustand';

export enum CountryType {
  KR = 'KR',      //Korea
  US = 'US',      //United States
  UK = 'UK',      //United Kingdom
  NL = 'NL'       //Netherlands
}

export interface MemberInfoData {
  id: number;
  originUrl?: string | null;
  name: string;
  year?: number;
  country?: CountryType;
  email?: string;
  contact?: string;
  description?: string;
}
// 각종 SNS(인스타, 유튜브, 트위터 등등)

interface MemberInfoState {
  memberInfo: MemberInfoData | null;
  setMemberInfo: (memberInfo: MemberInfoData) => void;
}

export const useMemberInfoStore = create<MemberInfoState>((set) => ({
  memberInfo: null,
  setMemberInfo: (memberInfo) => set({ memberInfo }),
}));