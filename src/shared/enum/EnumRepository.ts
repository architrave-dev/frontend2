export enum ModalType {
  NONE = 'NONE',
  SIGNIN = 'SIGNIN',
  LOGIN = 'LOGIN',
  WORK_STATION = 'WORK_STATION',
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
  I_WORK = 'I_WORK',
  WORK = 'WORK',
  DETAIL = 'DETAIL',
  DOCUMENT = 'DOCUMENT',
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
  S_EXH = 'S_EXH',  //Solo Exhibition
  G_EXH = 'G_EXH',  //Group Exhibition
  PRZ = 'PRZ',      //Prize
  PRS = 'PRS',      //Press
  RSD = 'RSD',      //Residency
  RPS = 'RPS',      //Representation
  TCH = 'TCH',      //Teach
  PBL = 'PBL',      //Publication
  COL = 'COL'       //Collections
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
  TEXT_ALIGNMENT = 'TEXT_ALIGNMENT',
  DISPLAY_ALIGNMENT = 'DISPLAY_ALIGNMENT',
  WORK_SIZE = 'WORK_SIZE',
  SORT_ORDER = 'SORT_ORDER',
}

export enum TextAlignment {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}

export enum WorkType {
  PAINTING_WATER = 'PAINTING_WATER',
  PAINTING_OIL = 'PAINTING_OIL',
  PAINTING_DRY = 'PAINTING_DRY',
  PRINTS = 'PRINTS',
  PHOTO = 'PHOTO',
  STUDY = 'STUDY',
  DIGITAL = 'DIGITAL',
  INSTALLATION = 'INSTALLATION',
  SCULPTURE = 'SCULPTURE',
  CONCEPTUAL_OBJECT = 'CONCEPTUAL_OBJECT',
  DETAILS = 'DETAILS',
  NONE = 'NONE'
}

export enum DisplayAlignment {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}

export enum WorkDisplaySize {
  BIG = 'BIG',
  REGULAR = 'REGULAR',
  SMALL = 'SMALL'
}


export enum SortOrder {
  TITLE_ASC = 'TITLE_ASC',
  TITLE_DESC = 'TITLE_DESC',
  SIZE_ASC = 'SIZE_ASC',
  SIZE_DESC = 'SIZE_DESC',
  YEAR_ASC = 'YEAR_ASC',
  YEAR_DESC = 'YEAR_DESC',
}