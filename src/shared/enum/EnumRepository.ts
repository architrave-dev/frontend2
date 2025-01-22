export enum ModalType {
  NONE = 'NONE',
  SIGNIN = 'SIGNIN',
  LOGIN = 'LOGIN',
  WORK_STATION = 'WORK_STATION',
  TEMP_WORK = 'TEMP_WORK',
  ORIGIN_IMG = 'ORIGIN_IMG',
  CHANGE_STATION = 'CHANGE_STATION'
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

export enum TempAlertType {
  WELCOME = 'WELCOME',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export enum TempAlertPosition {
  LT = 'LT',
  LC = 'LC',
  LB = 'LB',
  RT = 'RT',
  RC = 'RC',
  RB = 'RB'
}

export enum ProjectElementType {
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
  NL = 'NL',       //Netherlands
  FR = 'FR',      //France
  JP = 'JP',      //Japan
  CN = 'CN',      //China
  NONE = 'NONE'  // private or None selected
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
  WORK_TYPE = 'WORK_TYPE',
  COUNTRY = 'COUNTRY'
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
  CONCEPTUAL = 'CONCEPTUAL',
  DETAILS = 'DETAILS',
  NONE = 'NONE'
}

export enum DisplayAlignment {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}

export enum DisplaySize {
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

export enum ServiceType {
  BILLBOARD = 'BILLBOARD',
  WORK = 'WORK',
  DETAIL = 'DETAIL',
  DOCUMENT = 'DOCUMENT',
  PROJECT = 'PROJECT',
  MEMBER_INFO = 'MEMBER_INFO'
}