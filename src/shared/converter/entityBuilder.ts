import { CreateCareerReq, CreateProjectInfoReq, CreateWorkDetailReq, CreateWorkReq } from '../dto/ReqDtoRepository';
import { CareerType, WorkType } from '../enum/EnumRepository';


// project


// projectInfo
export const piBuilder = (parentId: string): CreateProjectInfoReq => {
  return {
    tempId: Math.floor(Math.random() * 100) + "",
    projectId: parentId,
    customName: '',
    customValue: ''
  };
}

// projectElement

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