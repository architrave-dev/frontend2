// 원활한 에러핸들링을 위해 에러메시지를 폐기하고 에러코드 도입
export enum ErrorCode {
  IDF = 'IDF', // Invalid Dto Field
  RVN = 'RVN', // Required Value Null
  NFR = 'NFR', // Not Found Result
  NAU = 'NAU', // Not Authorized User
  AEV = 'AEV', // Already Exist Value
  ATX = 'ATX',  // Access Token Expired
  RTX = 'RTX',  // Refresh Token Expired
  UME = 'UME',  // UnManaged Error

  AWS = 'AWS',  // Error about AWS

  WEF = 'WEF',  // Wrong Error Format
}

export const convertStringToErrorCode = (code: string): ErrorCode => {
  if (code in ErrorCode) {
    return ErrorCode[code as keyof typeof ErrorCode];
  } else {
    return ErrorCode.WEF;
  }
}