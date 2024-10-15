import { create } from 'zustand';
import { CountryType } from '../enum/EnumRepository';


export interface MemberInfoData {
  id: number;
  originUrl: string;
  thumbnailUrl: string;
  name: string;
  year: number;
  country: CountryType;
  email: string;
  contact: string;
  description: string;
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

interface MemberInfoStateForUpdate {
  updateMemberInfoDto: MemberInfoData | null;
  setUpdateMemberInfoDto: (updateMemberInfoDto: MemberInfoData) => void;
}

export const useMemberInfoStoreForUpdate = create<MemberInfoStateForUpdate>((set) => ({
  updateMemberInfoDto: null,
  setUpdateMemberInfoDto: (updateMemberInfoDto) => set({ updateMemberInfoDto })
}));