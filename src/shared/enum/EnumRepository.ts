export enum ModalType {
  NONE = 'NONE',
  SIGNIN = 'SIGNIN',
  LOGIN = 'LOGIN',
  ALERT = 'ALERT',
}

export enum AlertType {
  NONE = 'NONE',
  ALERT = 'ALERT',
  CONFIRM = 'CONFIRM',
}
export enum AlertPosition {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM'
}

export enum ProjectElementType {
  WORK = 'WORK',
  TEXTBOX = 'TEXTBOX',
  DIVIDER = 'DIVIDER',
}

export enum CountryType {
  KR = 'KR',      //Korea
  US = 'US',      //United States
  UK = 'UK',      //United Kingdom
  NL = 'NL'       //Netherlands
}

export enum CareerType {
  EDU = 'EDU',      //Education
  PRZ = 'PRZ',      //Prize
  PRS = 'PRS',      //Press
  RSD = 'RSD',      //Residency
  S_EXH = 'S_EXH',  //Solo Exhibition
  G_EXH = 'G_EXH',  //Group Exhibition
  RPS = 'RPS'       //Representation
}

export enum TextArea {
  WORK = 'WORK',
  TEXTBOX = 'TEXTBOX'
}

export enum ReuseInputType {
  NAME = 'NAME',
  VALUE = 'VALUE',
  NAME_NEW = 'NAME_NEW',
  VALUE_NEW = 'VALUE_NEW',
  WORK = 'WORK'
}

export enum DividerType {
  PLAIN = 'PLAIN',
  DOTTED = 'DOTTED',
  DASHED = 'DASHED',
}


export enum SelectType {
  TEXTBOX_ALIGNMENT = 'TEXTBOX_ALIGNMENT',
  WORK_ALIGNMENT = 'WORK_ALIGNMENT',
  WORK_SIZE = 'WORK_SIZE',
  SORT_ORDER = 'SORT_ORDER'
}

export enum TextBoxAlignment {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}

export enum WorkAlignment {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}

export enum WorkDisplaySize {
  BIG = 'BIG',
  REGULAR = 'REGULAR',
  SMALL = 'SMALL'
}

export enum WorkSize {
  BIG = 'BIG',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
}
export enum SortOrder {
  TITLE_ASC = 'TITLE_ASC',
  TITLE_DESC = 'TITLE_DESC',
  SIZE_ASC = 'SIZE_ASC',
  SIZE_DESC = 'SIZE_DESC',
  YEAR_ASC = 'YEAR_ASC',
  YEAR_DESC = 'YEAR_DESC',
}