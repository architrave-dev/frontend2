
import { useGlobalErrStore } from '../../store/errorStore';
import { ErrorCode, convertStringToErrorCode } from '../../api/errorCode';
import { useLoadingStore } from '../../store/loadingStore';
import { ServiceType } from '../../enum/EnumRepository';
import { uploadToS3 } from '../../aws/s3Upload';
import { UpdateBillboardReq, UpdateMemberInfoReq, UpdateProjectReq, UpdateUploadFileReq, UpdateWorkDetailReq, UpdateWorkReq } from '../../dto/ReqDtoRepository';
import { base64ToFileWithMime } from '../../aws/s3Upload';

type UpdateReqType = UpdateBillboardReq | UpdateMemberInfoReq | UpdateProjectReq | UpdateWorkReq | UpdateWorkDetailReq;
type UpdatePEType = { id: string, updateUploadFileReq: UpdateUploadFileReq, workId?: string };

interface UseImageResult {
  uploadImage: (aui: string, serviceType: ServiceType, data: UpdateReqType) => Promise<UpdateReqType | undefined>;
  uploadPEImage: (aui: string, serviceType: ServiceType, data: UpdatePEType, projectId?: string) => Promise<UpdatePEType | undefined>;
}

const MIN_SIZE = 1024 * 50;
const MAX_SIZE = 1024 * 1024 * 10;


export const useImage = (): UseImageResult => {
  const { setIsLoading } = useLoadingStore();
  const { setManagedErr, clearErr } = useGlobalErrStore();

  //이미지 크기 확인
  const sizeCheckSmall = (file: File): boolean => {
    if (file.size < MIN_SIZE) {
      console.log("file.size 가 너무 작아. 최소 50KB 이상!!")
      return false;
    }
    return true;
  }
  const sizeCheckBig = (file: File): boolean => {
    if (file.size > MAX_SIZE) {
      console.log("file.size 가 너무 크다. 최대 10MB 이하!!")
      return false;
    }
    return true;
  }

  //ProjectElement (Work, Detail, Document) 사용
  const uploadFileWithLocalUrlPE = async <T extends UpdatePEType>(
    serviceType: ServiceType,
    prevData: T,
    aui: string,
    projectId?: string
  ): Promise<T | undefined> => {
    setIsLoading(true);
    clearErr();
    const localImageUrl = prevData.updateUploadFileReq.originUrl;
    const file = base64ToFileWithMime(localImageUrl);
    try {
      if (!sizeCheckSmall(file)) {
        throw new Error('SFE');
      }
      if (!sizeCheckBig(file)) {
        throw new Error('BFE');
      }
      let originUrl: string;
      switch (serviceType) {
        case ServiceType.WORK:
          ({ originUrl } = await uploadToS3(file, aui, serviceType, [prevData.id]));
          break;
        case ServiceType.DETAIL:
          ({ originUrl } = await uploadToS3(file, aui, serviceType, [prevData.workId!, prevData.id]));
          break;
        case ServiceType.DOCUMENT:
          ({ originUrl } = await uploadToS3(file, aui, serviceType, [projectId!, prevData.id]));
          break;
        default:
          throw new Error('Unsupported service type');
      }
      return {
        ...prevData,
        updateUploadFileReq: {
          ...prevData.updateUploadFileReq,
          originUrl
        }
      };
    } catch (err) {
      const errCode = err instanceof Error ? err.message as ErrorCode : ErrorCode.AWS;
      setManagedErr({
        errCode: convertStringToErrorCode(errCode)
      });
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }


  //Billboard, Work, Detail(workId 필요), Project, MemberInfo 사용
  const uploadFileWithLocalUrl = async <T extends UpdateReqType & { id: string, workId?: string }>(
    serviceType: ServiceType,
    prevData: T,
    aui: string
  ): Promise<T | undefined> => {
    setIsLoading(true);
    clearErr();
    const localImageUrl = prevData.updateUploadFileReq.originUrl;
    const file = base64ToFileWithMime(localImageUrl);
    try {
      if (!sizeCheckSmall(file)) {
        throw new Error('SFE');
      }
      if (!sizeCheckBig(file)) {
        throw new Error('BFE');
      }

      let extraData: string[] = [];
      switch (serviceType) {
        case ServiceType.BILLBOARD:
          extraData = [prevData.id];
          break;
        case ServiceType.WORK:
          extraData = [prevData.id];
          break;
        case ServiceType.DETAIL:
          extraData = [prevData.workId!, prevData.id];
          break;
        case ServiceType.PROJECT:
          extraData = [prevData.id];
          break;
        case ServiceType.MEMBER_INFO:
          extraData = [prevData.id];
          break;
        default:
          throw new Error('Unsupported service type');
      }

      const { originUrl } = await uploadToS3(file, aui, serviceType, extraData);

      return {
        ...prevData,
        updateUploadFileReq: {
          ...prevData.updateUploadFileReq,
          originUrl
        }
      };
    } catch (err) {
      const errCode = err instanceof Error ? err.message as ErrorCode : ErrorCode.AWS;
      setManagedErr({
        errCode: convertStringToErrorCode(errCode)
      });
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImageHandler = (aui: string, serviceType: ServiceType, data: UpdateReqType) => uploadFileWithLocalUrl(serviceType, data, aui);
  const uploadPEImageHandler = (aui: string, serviceType: ServiceType, data: UpdatePEType, projectId?: string) => uploadFileWithLocalUrlPE(serviceType, data, aui, projectId);


  return {
    uploadImage: uploadImageHandler,
    uploadPEImage: uploadPEImageHandler
  };
}