
import { useGlobalErrStore } from '../../store/errorStore';
import { ErrorCode } from '../../api/errorCode';
import { useLoadingStore } from '../../store/loadingStore';
import { ServiceType } from '../../enum/EnumRepository';
import { uploadToS3 } from '../../aws/s3Upload';
import { UpdateBillboardReq, UpdateMemberInfoReq, UpdateProjectReq, UpdateUploadFileReq, UpdateWorkDetailReq, UpdateWorkReq } from '../../dto/ReqDtoRepository';
import { base64ToFileWithMime } from '../../aws/s3Upload';

type UpdateReqType = UpdateBillboardReq | UpdateMemberInfoReq | UpdateProjectReq | UpdateWorkReq | UpdateWorkDetailReq;
type UpdatePEType = { id: string, updateUploadFileReq: UpdateUploadFileReq, workId?: string };

interface UseImageResult {
  uploadImage: (aui: string, serviceType: ServiceType, data: UpdateReqType) => Promise<UpdateReqType>;
  uploadPEImage: (aui: string, serviceType: ServiceType, data: UpdatePEType, projectId?: string) => Promise<UpdatePEType>;
}

const MIN_SIZE = 1024 * 50;
const MAX_SIZE = 1024 * 1024 * 10;


export const useImage = (): UseImageResult => {
  const { setIsLoading } = useLoadingStore();
  const { setManagedErr, clearErr } = useGlobalErrStore();

  //이미지 크기 확인
  const sizeCheck = (file: File): boolean => {
    if (file.size < MIN_SIZE) {
      console.log("file.size 가 너무 작아. 최소 50KB 이상!!")
      setManagedErr({
        errCode: ErrorCode.SFE,
      });
      return false;
    }
    if (file.size > MAX_SIZE) {
      console.log("file.size 가 너무 크다. 최대 10MB 이하!!")
      setManagedErr({
        errCode: ErrorCode.BFE,
      });
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
  ): Promise<T> => {
    setIsLoading(true);
    clearErr();
    const localImageUrl = prevData.updateUploadFileReq.originUrl;
    const file = base64ToFileWithMime(localImageUrl);
    if (!sizeCheck(file)) {
      return prevData;
    }
    try {
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
      setManagedErr({
        errCode: ErrorCode.AWS,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }


  //Billboard, Work, Detail(workId 필요), Project, MemberInfo 사용
  const uploadFileWithLocalUrl = async <T extends UpdateReqType & { id: string, workId?: string }>(
    serviceType: ServiceType,
    prevData: T,
    aui: string
  ): Promise<T> => {
    setIsLoading(true);
    clearErr();
    const localImageUrl = prevData.updateUploadFileReq.originUrl;
    const file = base64ToFileWithMime(localImageUrl);
    if (!sizeCheck(file)) {
      return prevData;
    }
    try {
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
      setManagedErr({
        errCode: ErrorCode.AWS,
        // retryFunction: () => handleCareerRequest(aui, action, data)
      });
      throw err;
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