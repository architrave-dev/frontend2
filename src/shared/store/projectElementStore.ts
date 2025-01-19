import { create } from 'zustand';
import { DocumentData, ProjectElementData, TextBoxData, WorkData, WorkDetailData } from '../dto/EntityRepository';
import { DisplayAlignment, DisplaySize, ProjectElementType, TextAlignment } from '../enum/EnumRepository';

interface ProjectElementListState {
  projectElementList: ProjectElementData[];
  setOnlyProjectElementList: (projectElementList: ProjectElementData[]) => void;
  setProjectElementList: (projectElementList: ProjectElementData[]) => void;
  updateWork: (id: string, updates: Partial<WorkData>) => void;
  updateDetail: (id: string, updates: Partial<WorkDetailData>) => void;
  updateDocument: (id: string, updates: Partial<DocumentData>) => void;
  updateTextBox: (id: string, updates: Partial<TextBoxData>) => void;
  updateImage: (id: string, peType: ProjectElementType, thumbnailUrl: string, originUrl: string) => void;
  updateTextAlignment: (id: string, textAlignment: TextAlignment) => void;
  updateDisplayAlignment: (id: string, displayAlignment: DisplayAlignment) => void;
  updateDisplaySize: (id: string, displaySize: DisplaySize) => void;
}

export const useProjectElementListStore = create<ProjectElementListState>((set) => ({
  projectElementList: [],
  setOnlyProjectElementList: (projectElementList) => set({ projectElementList }),
  setProjectElementList: (projectElementList) =>
    set(() => ({
      projectElementList: projectElementList.map((pe) => ({
        ...pe,
        hasChanged: false,
        imageChanged: false
      })),
    })),
  updateWork: (id, updates) =>
    set(({ projectElementList }) => ({
      projectElementList: projectElementList.map((pe) =>
        pe.id === id ? {
          ...pe,
          work: {
            ...pe.work!,
            ...updates,
          },
          hasChanged: true
        } : pe
      ),
    })),
  updateDetail: (id, updates) =>
    set(({ projectElementList }) => ({
      projectElementList: projectElementList.map((pe) =>
        pe.id === id ? {
          ...pe,
          workDetail: {
            ...pe.workDetail!,
            ...updates,
          },
          hasChanged: true
        } : pe
      ),
    })),
  updateDocument: (id, updates) =>
    set(({ projectElementList }) => ({
      projectElementList: projectElementList.map((pe) =>
        pe.id === id ? {
          ...pe,
          document: {
            ...pe.document!,
            ...updates,
          },
          hasChanged: true
        } : pe
      ),
    })),
  updateTextBox: (id, updates) =>
    set(({ projectElementList }) => ({
      projectElementList: projectElementList.map((pe) =>
        pe.id === id ? {
          ...pe,
          textBox: {
            ...pe.textBox!,
            ...updates,
          },
          hasChanged: true
        } : pe
      ),
    })),
  updateImage: (id, peType, thumbnailUrl, originUrl) =>
    set(({ projectElementList }) => ({
      projectElementList: projectElementList.map((pe) => {
        if (pe.id !== id) return pe;

        switch (peType) {
          case ProjectElementType.WORK:
            if (!pe.work) return pe;
            return {
              ...pe,
              work: {
                ...pe.work,
                uploadFile: {
                  ...pe.work.uploadFile,
                  originUrl,
                  thumbnailUrl,
                },
              },
              hasChanged: true,
              imageChanged: true,
            };

          case ProjectElementType.DETAIL:
            if (!pe.workDetail) return pe;
            return {
              ...pe,
              workDetail: {
                ...pe.workDetail,
                uploadFile: {
                  ...pe.workDetail.uploadFile,
                  originUrl,
                  thumbnailUrl,
                },
              },
              hasChanged: true,
              imageChanged: true,
            };

          case ProjectElementType.DOCUMENT:
            if (!pe.document) return pe;
            return {
              ...pe,
              document: {
                ...pe.document,
                uploadFile: {
                  ...pe.document.uploadFile,
                  originUrl,
                  thumbnailUrl,
                },
              },
              hasChanged: true,
              imageChanged: true,
            };

          default:
            return pe;
        }
      }),
    })),
  updateTextAlignment: (id, textAlignment) => set(({ projectElementList }) => ({
    projectElementList: projectElementList.map((pe) =>
      pe.id === id ?
        {
          ...pe,
          textAlignment,
          hasChanged: true
        }
        : pe
    ),
  })),
  updateDisplayAlignment: (id, displayAlignment) => set(({ projectElementList }) => ({
    projectElementList: projectElementList.map((pe) =>
      pe.id === id ?
        {
          ...pe,
          displayAlignment,
          hasChanged: true
        }
        : pe
    ),
  })),
  updateDisplaySize: (id, displaySize) => set(({ projectElementList }) => ({
    projectElementList: projectElementList.map((pe) =>
      pe.id === id ?
        {
          ...pe,
          displaySize,
          hasChanged: true
        }
        : pe
    ),
  })),
}));