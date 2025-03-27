import { create } from 'zustand';
import { ProjectInfoData } from '../dto/EntityRepository';

interface ProjectInfoListState {
  projectInfoList: ProjectInfoData[];
  // 기본 projectInfoList에 변경된 객체를 확인할 수 있는 hasChanged 속성을 추가
  setProjectInfoList: (piList: ProjectInfoData[]) => void;
  // 기본 projectInfoList에 hasChanged 속성을 true로 변경하여 변경됨을 체크한다.
  updateProjectInfo: (id: string, updates: Partial<ProjectInfoData>) => void;

  // 새로운 projectInfo를 추가
  afterCreateProjectInfo: (projectInfo: ProjectInfoData) => void;
  // 업데이트 이후 사용
  // map 메소드로 변경된 객체를 갈아끼운 후 추가사항없이 projectInfoList를 업데이트
  afterUpdateProjectInfo: (updatedProjectInfo: ProjectInfoData) => void;
  // 왜 여기 있나요? 
  // 삭제된 object의 id를 알 수 없기 때문에
  // delete 성공처리를 하는 hook에서 처리하지 못한다.
  afterDeleteProjectInfo: (id: string) => void;
}

export const useProjectInfoListStore = create<ProjectInfoListState>((set) => ({
  projectInfoList: [],
  setProjectInfoList: (projectInfoList) =>
    set(() => ({
      projectInfoList: projectInfoList.map((pi) => ({ ...pi, hasChanged: false })),
    })),
  updateProjectInfo: (id, updates) =>
    set(({ projectInfoList }) => ({
      projectInfoList: projectInfoList.map((pi) =>
        pi.id === id ?
          { ...pi, ...updates, hasChanged: true }
          : pi
      ),
    })),
  afterCreateProjectInfo: (projectInfo) =>
    set(({ projectInfoList }) => ({
      projectInfoList: [...projectInfoList,     // 기존 projectInfoList
      { ...projectInfo, hasChanged: false }   // 새롭게 생성한 projectInfo
      ]
    })),
  afterDeleteProjectInfo: (id) =>
    set(({ projectInfoList }) => ({
      projectInfoList: projectInfoList.filter((pi) => pi.id !== id)
    })),
  afterUpdateProjectInfo: (updatedProjectInfo) =>
    set(({ projectInfoList }) => ({
      projectInfoList: projectInfoList.map((pi) =>
        pi.id === updatedProjectInfo.id ? updatedProjectInfo : pi
      )
    }))
}));