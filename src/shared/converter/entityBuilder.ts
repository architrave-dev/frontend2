import { CreateCareerReq, CreateDocumentReq, CreateProjectElementReq, CreateProjectElementWithWorkDetailReq, CreateProjectElementWithWorkReq, CreateProjectInfoReq, CreateProjectReq, CreateTextBoxReq, CreateWorkDetailReq, CreateWorkReq } from '../dto/ReqDtoRepository';
import { CareerType, DisplayAlignment, DividerType, ProjectElementType, TextAlignment, DisplaySize, WorkType } from '../enum/EnumRepository';


// project
export const projectBuilder = (newTitle: string): CreateProjectReq => {
  return {
    originUrl: '',
    thumbnailUrl: '',
    title: newTitle,
    description: ''
  };
}

// projectInfo
export const piBuilder = (parentId: string): CreateProjectInfoReq => {
  return {
    tempId: Math.floor(Math.random() * 100) + "",
    projectId: parentId,
    customName: '',
    customValue: ''
  };
}

// import projectElement
export const peWorkImportBuilder = (projectId: string, workId: string): CreateProjectElementWithWorkReq => {
  return {
    projectId: projectId,
    workId: workId,
    displayAlignment: DisplayAlignment.CENTER,
    displaySize: DisplaySize.BIG,
  };
}
export const peDetailImportBuilder = (projectId: string, detailId: string): CreateProjectElementWithWorkDetailReq => {
  return {
    projectId: projectId,
    workDetailId: detailId,
    displayAlignment: DisplayAlignment.CENTER,
    displaySize: DisplaySize.BIG,
  };
}

// projectElement
export const peWorkBuilder = (projectId: string): CreateProjectElementReq => {
  return {
    tempId: Math.floor(Math.random() * 100) + "",
    projectId: projectId,
    projectElementType: ProjectElementType.WORK,
    createWorkReq: workBuilder(),
    displayAlignment: DisplayAlignment.CENTER,
    displaySize: DisplaySize.BIG,
  };
}
export const peDetailBuilder = (projectId: string, workId: string): CreateProjectElementReq => {
  // WorkDetail은 여기서 생성하지 않는다.
  return {
    tempId: Math.floor(Math.random() * 100) + "",
    projectId: projectId,
    projectElementType: ProjectElementType.DETAIL,
    createWorkDetailReq: {
      workId: workId,
      originUrl: '',
      thumbnailUrl: '',
      description: "",
    },
    displayAlignment: DisplayAlignment.CENTER,
    displaySize: DisplaySize.BIG,
  };
}
export const peDocBuilder = (projectId: string): CreateProjectElementReq => {
  return {
    tempId: Math.floor(Math.random() * 100) + "",
    projectId: projectId,
    projectElementType: ProjectElementType.DOCUMENT,
    createDocumentReq: documentBuilder(),
    displayAlignment: DisplayAlignment.CENTER,
  };
}
export const peTextBoxBuilder = (projectId: string): CreateProjectElementReq => {
  return {
    tempId: Math.floor(Math.random() * 100) + "",
    projectId: projectId,
    projectElementType: ProjectElementType.TEXTBOX,
    createTextBoxReq: textBoxBuilder(),
    textAlignment: TextAlignment.CENTER,
  };
}
export const peDividerBuilder = (projectId: string): CreateProjectElementReq => {
  return {
    tempId: Math.floor(Math.random() * 100) + "",
    projectId: projectId,
    projectElementType: ProjectElementType.DIVIDER,
    dividerType: DividerType.PLAIN
  };
}


// Work
export const workBuilder = (): CreateWorkReq => {
  return {
    workType: WorkType.NONE,
    originUrl: '',
    thumbnailUrl: '',
    title: "New Work",
    description: "This is New Work",
    size: {
      width: "000",
      height: "000"
    },
    material: "material",
    prodYear: new Date().getFullYear().toString(),
    price: "",
    collection: ""
  };
}

// WorkDetail
export const detailBuilder = (parentId: string): CreateWorkDetailReq => {
  return {
    workId: parentId,
    originUrl: "",
    thumbnailUrl: "",
    description: "",
  };
}

// Career
export const careerBuilder = (careerType: CareerType): CreateCareerReq => {
  return {
    tempId: Math.floor(Math.random() * 1000) + "",
    careerType,
    yearFrom: new Date().getFullYear(),
    content: ""
  };
}

// TextBox
export const textBoxBuilder = (): CreateTextBoxReq => {
  return {
    content: ""
  };
}

export const documentBuilder = (): CreateDocumentReq => {
  return {
    originUrl: '',
    thumbnailUrl: '',
    description: "",
  };
}
