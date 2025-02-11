import { create } from 'zustand';
import { MemberInfoData } from '../dto/EntityRepository';


interface MemberInfoState {
  memberInfo: MemberInfoData | null;
  hasChanged: boolean;
  imageChanged: boolean;
  setMemberInfo: (memberInfo: MemberInfoData) => void;
  updatMemberInfo: (updates: Partial<MemberInfoData>) => void;
  updateImage: (originUrl: string) => void;
}

export const useMemberInfoStore = create<MemberInfoState>((set) => ({
  memberInfo: null,
  hasChanged: false,
  imageChanged: false,
  setMemberInfo: (memberInfo) => set({ memberInfo, hasChanged: false, imageChanged: false }),
  updatMemberInfo: (updates) =>
    set(({ memberInfo }) => ({
      memberInfo: memberInfo ?
        { ...memberInfo, ...updates }
        : null,
      hasChanged: true
    })),

  updateImage: (originUrl: string) =>
    set(({ memberInfo }) => ({
      memberInfo: memberInfo ? {
        ...memberInfo,
        uploadFile: {
          ...memberInfo.uploadFile,
          originUrl,
        }
      } : null,
      hasChanged: true,
      imageChanged: true,
    })),
}));