import { CareerType, CountryType, DividerType, ProjectElementType, TextAlignment, DisplayAlignment, WorkDisplaySize, WorkType } from '../enum/EnumRepository';

/**
 * 전부 ~Data로 통일
 */

export interface UserData {
  id: string;
  email: string;
  username: string;
  aui: string;
  role: string;
}

export interface UserDataWithRefreshToken extends UserData {
  refreshToken: string;
}

export interface UploadFileData {
  id: string;
  originUrl: string;
  thumbnailUrl: string;
}

export interface BillboardData {
  id: string;
  uploadFile: UploadFileData;
  title: string;
  description: string;
  isVisible: boolean;
}

export interface SizeData {
  width: string;
  height: string;
  depth?: string;
}
export const getAreaFromSize = (value: SizeData): number => {
  if (value.depth) {
    return Number.parseInt(value.width) * Number.parseInt(value.height) * Number.parseInt(value.depth);
  } else {
    return Number.parseInt(value.width) * Number.parseInt(value.height);
  }
}


export const convertSizeToString = (value: SizeData): string => {
  if (value.depth) {
    return `${value.width}x${value.height}x${value.depth}`;
  } else {
    return `${value.width}x${value.height}`;
  }
}

export const convertStringToSize = (value: string): SizeData => {
  const dimensions = value.split('x').map(dim => dim.trim());

  if (dimensions.length < 2 || dimensions.length > 3) {
    throw new Error('Invalid size string format. Expected "widthxheight" or "widthxheightxdepth"');
  }

  const result: SizeData = {
    width: dimensions[0],
    height: dimensions[1]
  };

  if (dimensions.length === 3) {
    result.depth = dimensions[2];
  }

  return result;
}

export interface WorkData {
  id: string;
  workType: WorkType;
  uploadFile: UploadFileData;
  title: string;
  description: string;
  size: SizeData;
  material: string,
  prodYear: string,
  price: string,
  collection: string
}

export interface WorkSimpleData {
  id: string;
  thumbnailUrl: string;
  title: string;
}

export interface WorkDetailData {
  id: string;
  uploadFile: UploadFileData;
  description: string;
}
export interface WorkWithDetailData extends WorkData {
  workDetailList: WorkDetailData[]; // 추가된 필드
}

export interface WorkPropertyVisibleData {
  workPropertyVisibleId: string;
  workType: boolean;
  imageUrl: boolean;
  description: boolean;
  price: boolean,
  collection: boolean
}

export interface DocumentData {
  id: string;
  uploadFile: UploadFileData;
  description: string;
}

export interface TextBoxData {
  id: string;
  content: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  uploadFile: UploadFileData;
  projectInfoList: ProjectInfoData[];
  piIndex: string;
}

export interface ProjectInfoData {
  id: string;
  customName: string;
  customValue: string;
}

// 뭔가 애매하네
export interface ProjectSimpleData {
  id: string;
  title: string;
  description: string;
  originUrl: string;
  thumbnailUrl: string;
}

export interface ProjectElementData {
  id: string;
  projectElementType: ProjectElementType;
  work: WorkData | null;
  workAlignment: DisplayAlignment | null;
  workDisplaySize: WorkDisplaySize | null;
  workDetail: WorkDetailData | null;
  workDetailAlignment: DisplayAlignment | null;
  workDetailDisplaySize: WorkDisplaySize | null;
  textBox: TextBoxData | null;
  textBoxAlignment: TextAlignment | null;
  document: DocumentData | null;
  documentAlignment: TextAlignment | null;
  dividerType: DividerType | null;
}

export interface MemberInfoData {
  id: string;
  uploadFile: UploadFileData;
  name: string;
  year: string;
  country: CountryType;
  email: string;
  contact: string;
  description: string;
  // 각종 SNS(인스타, 유튜브, 트위터 등등)
}

export interface CareerData {
  id: string;
  careerType: CareerType;
  yearFrom: number;
  content: string;
  index: number;
}

export interface IndexData {
  id: string;
  tempId: string;
}