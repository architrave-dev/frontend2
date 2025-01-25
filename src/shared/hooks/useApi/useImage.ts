
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


export const useImage = (): UseImageResult => {
  const { setIsLoading } = useLoadingStore();
  const { setManagedErr, clearErr } = useGlobalErrStore();


  //screen width 확인해서 
  //어떤 크기의 이미지가 필요한지 확인

  //ProjectElement (Work, Detail, Document) 사용
  const uploadFileWithLocalUrlPE = async <T extends UpdatePEType>(
    serviceType: ServiceType,
    prevData: T,
    aui: string,
    projectId?: string
  ): Promise<T> => {
    const localImageUrl = prevData.updateUploadFileReq.originUrl;
    const file = base64ToFileWithMime(localImageUrl);
    try {
      let originUrl, thumbnailUrl: string;
      switch (serviceType) {
        case ServiceType.WORK:
          ({ originUrl, thumbnailUrl } = await uploadToS3(file, aui, serviceType, [prevData.id]));
          break;
        case ServiceType.DETAIL:
          ({ originUrl, thumbnailUrl } = await uploadToS3(file, aui, serviceType, [prevData.workId!, prevData.id]));
          break;
        case ServiceType.DOCUMENT:
          ({ originUrl, thumbnailUrl } = await uploadToS3(file, aui, serviceType, [projectId!, prevData.id]));
          break;
        default:
          throw new Error('Unsupported service type');
      }
      return {
        ...prevData,
        updateUploadFileReq: {
          ...prevData.updateUploadFileReq,
          originUrl,
          thumbnailUrl
        }
      };
    } catch (error) {
      throw new Error(ErrorCode.AWS);
    }
  };


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

      const { originUrl, thumbnailUrl } = await uploadToS3(file, aui, serviceType, extraData);

      return {
        ...prevData,
        updateUploadFileReq: {
          ...prevData.updateUploadFileReq,
          originUrl,
          thumbnailUrl
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