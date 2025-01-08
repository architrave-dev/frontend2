

// project

import { CreateCareerReq } from '../dto/ReqDtoRepository';
import { CareerType } from '../enum/EnumRepository';

// projectInfo
// projectElement

// Work

// WorkDetail

// Career
export const careerBuilder = (careerType: CareerType): CreateCareerReq => {
  return {
    tempId: Math.floor(Math.random() * 1000) + "",
    careerType,
    yearFrom: new Date().getFullYear(),
    content: ""
  };
}