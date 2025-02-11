import { create } from 'zustand';
import { DocumentData, ProjectElementData, ProjectElementDataWithDetail, ProjectElementDataWithDocument, ProjectElementDataWithTextBox, ProjectElementDataWithWork, TextBoxData, WorkData, WorkDetailData } from '../dto/EntityRepository';
import { DisplayAlignment, DisplaySize, ProjectElementType, TextAlignment } from '../enum/EnumRepository';

interface ProjectElementListState {
  projectElementList: ProjectElementData[];
  setOnlyProjectElementList: (projectElementList: ProjectElementData[]) => void;
  setProjectElementList: (projectElementList: ProjectElementData[]) => void;
  updateWork: (id: string, updates: Partial<WorkData>) => void;
  updateDetail: (id: string, updates: Partial<WorkDetailData>) => void;
  updateDocument: (id: string, updates: Partial<DocumentData>) => void;
  updateTextBox: (id: string, updates: Partial<TextBoxData>) => void;
  updateImage: (id: string, originUrl: string) => void;
  updateTextAlignment: (id: string, textAlignment: TextAlignment) => void;
  updateDisplayAlignment: (id: string, displayAlignment: DisplayAlignment) => void;
  updateDisplaySize: (id: string, displaySize: DisplaySize) => void;
  afterDeleteProjectElement: (id: string) => void;
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
      projectElementList: projectElementList.map((pe) => {
        if (pe.id !== id) return pe;
        if (pe.projectElementType !== ProjectElementType.WORK) return pe;

        return {
          ...pe,
          work: {
            ...pe.work,
            ...updates,
          },
          hasChanged: true,
        } satisfies ProjectElementDataWithWork;
      }),
    })),
  updateDetail: (id, updates) =>
    set(({ projectElementList }) => ({
      projectElementList: projectElementList.map((pe) => {
        if (pe.id !== id) return pe;
        if (pe.projectElementType !== ProjectElementType.DETAIL) return pe;
        return {
          ...pe,
          workDetail: {
            ...pe.workDetail,
            ...updates,
          },
          hasChanged: true,
        } satisfies ProjectElementDataWithDetail;
      }),
    })),
  updateDocument: (id, updates) =>
    set(({ projectElementList }) => ({
      projectElementList: projectElementList.map((pe) => {
        if (pe.id !== id) return pe;
        if (pe.projectElementType !== ProjectElementType.DOCUMENT) return pe;

        return {
          ...pe,
          document: {
            ...pe.document,
            ...updates,
          },
          hasChanged: true,
        } satisfies ProjectElementDataWithDocument;
      }),
    })),
  updateTextBox: (id, updates) =>
    set(({ projectElementList }) => ({
      projectElementList: projectElementList.map((pe) => {
        if (pe.id !== id) return pe;
        if (pe.projectElementType !== ProjectElementType.TEXTBOX) return pe;

        return {
          ...pe,
          textBox: {
            ...pe.textBox,
            ...updates,
          },
          hasChanged: true,
        } satisfies ProjectElementDataWithTextBox;
      }),
    })),
  updateImage: (id, originUrl) =>
    set(({ projectElementList }) => ({
      projectElementList: projectElementList.map((pe) => {
        if (pe.id !== id) return pe;

        switch (pe.projectElementType) {
          case ProjectElementType.WORK:
            return {
              ...pe,
              work: {
                ...pe.work,
                uploadFile: {
                  ...pe.work.uploadFile,
                  originUrl,
                },
              },
              hasChanged: true,
              imageChanged: true,
            };

          case ProjectElementType.DETAIL:
            return {
              ...pe,
              workDetail: {
                ...pe.workDetail,
                uploadFile: {
                  ...pe.workDetail.uploadFile,
                  originUrl,
                },
              },
              hasChanged: true,
              imageChanged: true,
            };

          case ProjectElementType.DOCUMENT:
            return {
              ...pe,
              document: {
                ...pe.document,
                uploadFile: {
                  ...pe.document.uploadFile,
                  originUrl,
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
  afterDeleteProjectElement: (id) =>
    set(({ projectElementList }) => ({
      projectElementList: projectElementList.filter((pe) => pe.id !== id)
    }))
}));