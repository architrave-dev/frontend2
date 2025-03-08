import { CreateCareerReq, CreateDocumentReq, CreateProjectElementReq, CreateProjectElementWithWorkDetailReq, CreateProjectElementWithWorkReq, CreateProjectInfoReq, CreateProjectReq, CreateTextBoxReq, CreateWorkDetailReq, CreateWorkReq } from '../dto/ReqDtoRepository';
import { CareerType, DisplayAlignment, DividerType, ProjectElementType, TextAlignment, DisplaySize, WorkType } from '../enum/EnumRepository';


// project
export const projectBuilder = (newTitle: string, index: number): CreateProjectReq => {
  return {
    originUrl: '',
    title: newTitle,
    description: '',
    index
  };
}

// projectInfo
export const piBuilder = (parentId: string, index: number): CreateProjectInfoReq => {
  return {
    projectId: parentId,
    customName: '',
    customValue: '',
    index
  };
}

// import projectElement
export const peWorkImportBuilder = (projectId: string, workId: string, index: number): CreateProjectElementWithWorkReq => {
  return {
    projectId: projectId,
    workId: workId,
    displayAlignment: DisplayAlignment.CENTER,
    displaySize: DisplaySize.BIG,
    index
  };
}
export const peDetailImportBuilder = (projectId: string, detailId: string, index: number): CreateProjectElementWithWorkDetailReq => {
  return {
    projectId: projectId,
    workDetailId: detailId,
    displayAlignment: DisplayAlignment.CENTER,
    displaySize: DisplaySize.BIG,
    index
  };
}

// projectElement
export const peWorkBuilder = (projectId: string, index: number): CreateProjectElementReq => {
  return {
    projectId: projectId,
    projectElementType: ProjectElementType.WORK,
    createWorkReq: workBuilder(),
    displayAlignment: DisplayAlignment.CENTER,
    displaySize: DisplaySize.BIG,
    index
  };
}
export const peDetailBuilder = (projectId: string, workId: string, index: number): CreateProjectElementReq => {
  // WorkDetail은 여기서 생성하지 않는다.
  return {
    projectId: projectId,
    projectElementType: ProjectElementType.DETAIL,
    createWorkDetailReq: {
      workId: workId,
      originUrl: '',
      description: "",
    },
    displayAlignment: DisplayAlignment.CENTER,
    displaySize: DisplaySize.BIG,
    index
  };
}
export const peDocBuilder = (projectId: string, index: number): CreateProjectElementReq => {
  return {
    projectId: projectId,
    projectElementType: ProjectElementType.DOCUMENT,
    createDocumentReq: documentBuilder(),
    displayAlignment: DisplayAlignment.CENTER,
    index
  };
}
export const peTextBoxBuilder = (projectId: string, index: number): CreateProjectElementReq => {
  return {
    projectId: projectId,
    projectElementType: ProjectElementType.TEXTBOX,
    createTextBoxReq: textBoxBuilder(),
    textAlignment: TextAlignment.CENTER,
    index
  };
}
export const peDividerBuilder = (projectId: string, index: number): CreateProjectElementReq => {
  return {
    projectId: projectId,
    projectElementType: ProjectElementType.DIVIDER,
    dividerType: DividerType.PLAIN,
    index
  };
}


// Work
export const workBuilder = (): CreateWorkReq => {
  return {
    workType: WorkType.NONE,
    originUrl: '',
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
    description: "",
  };
}

// Career
export const careerBuilder = (careerType: CareerType, index: number): CreateCareerReq => {
  return {
    careerType,
    yearFrom: new Date().getFullYear(),
    content: "",
    index
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
    description: "",
  };
}
