import { CareerType, CountryType, DividerType, ProjectElementType, TextBoxAlignment, WorkAlignment, WorkDisplaySize } from '../enum/EnumRepository';

/**
 * 전부 ~Data로 통일
 */

export interface UserData {
  id: number;
  email: string;
  username: string;
  aui: string;
  role: string;
}

export interface UserDataWithRefreshToken extends UserData {
  refreshToken: string;
}

export interface BillboardData {
  id: number;
  originUrl: string;
  thumbnailUrl: string;
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
  originUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  size: SizeData;
  material: string,
  prodYear: string,
  //genre : drawing, painting, Sculpture, Installation, Video, Photo, 
  //Sketch or Research
  //Price: 
}

export interface TextBoxData {
  id: string;
  content: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  originUrl: string;
  thumbnailUrl: string;
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
  workAlignment: WorkAlignment | null;
  workDisplaySize: WorkDisplaySize | null;
  textBox: TextBoxData | null;
  textBoxAlignment: TextBoxAlignment | null;
  dividerType: DividerType | null;
}

export interface MemberInfoData {
  id: number;
  originUrl: string;
  thumbnailUrl: string;
  name: string;
  year: number;
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
  yearTo: number;
  content: string;
  index: number;
}

export interface IndexData {
  id: string;
  tempId: string;
}