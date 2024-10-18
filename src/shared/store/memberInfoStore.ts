import { create } from 'zustand';
import { CountryType } from '../enum/EnumRepository';
import { MemberInfoData } from '../dto/EntityRepository';


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