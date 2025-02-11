import { ProjectElementData, ProjectElementDataWithDetail, ProjectElementDataWithDivider, ProjectElementDataWithDocument, ProjectElementDataWithTextBox, ProjectElementDataWithWork } from '../dto/EntityRepository';
import { UpdateDocumentReq, UpdateProjectElementReq, UpdateProjectElementReqDetail, UpdateProjectElementReqDivider, UpdateProjectElementReqDocument, UpdateProjectElementReqTextBox, UpdateProjectElementReqWork, UpdateTextBoxReq, UpdateUploadFileReq, UpdateWorkDetailReq, UpdateWorkReq } from '../dto/ReqDtoRepository';
import { ProjectElementType } from '../enum/EnumRepository';

const convertWorkToUpdatePeReq = (
  target: ProjectElementDataWithWork
): UpdateProjectElementReqWork => {

  const updateUploadFileReq: UpdateUploadFileReq = {
    uploadFileId: target.work.uploadFile.id,
    originUrl: target.work.uploadFile.originUrl,
  };

  const updateWorkReq: UpdateWorkReq = {
    id: target.work.id,
    workType: target.work.workType,
    updateUploadFileReq,
    title: target.work.title,
    description: target.work.description,
    size: target.work.size,
    material: target.work.material,
    prodYear: target.work.prodYear,
    price: target.work.price,
    collection: target.work.collection,
  };

  return {
    projectElementId: target.id,
    projectElementType: ProjectElementType.WORK,
    updateWorkReq,
    displayAlignment: target.displayAlignment,
    displaySize: target.displaySize,
  };
};

const convertDetailToUpdatePeReq = (
  target: ProjectElementDataWithDetail
): UpdateProjectElementReqDetail => {
  const updateUploadFileReq: UpdateUploadFileReq = {
    uploadFileId: target.workDetail.uploadFile.id,
    originUrl: target.workDetail.uploadFile.originUrl,
  };

  const updateWorkDetailReq: UpdateWorkDetailReq = {
    id: target.workDetail.id,
    workId: target.workDetail.workId,
    updateUploadFileReq,
    description: target.workDetail.description,
  };

  return {
    projectElementId: target.id,
    projectElementType: ProjectElementType.DETAIL,
    updateWorkDetailReq,
    displayAlignment: target.displayAlignment,
    displaySize: target.displaySize,
  };
};

const convertDocumentPeToUpdatePeReq = (
  target: ProjectElementDataWithDocument
): UpdateProjectElementReqDocument => {

  const updateUploadFileReq: UpdateUploadFileReq = {
    uploadFileId: target.document.uploadFile.id,
    originUrl: target.document.uploadFile.originUrl,
  };

  const updateDocumentReq: UpdateDocumentReq = {
    id: target.document.id,
    updateUploadFileReq,
    description: target.document.description,
  };

  return {
    projectElementId: target.id,
    projectElementType: ProjectElementType.DOCUMENT,
    updateDocumentReq,
    displayAlignment: target.displayAlignment,
  };
};

const convertTextBoxToUpdatePeReq = (
  target: ProjectElementDataWithTextBox
): UpdateProjectElementReqTextBox => {

  const updateTextBoxReq: UpdateTextBoxReq = {
    id: target.textBox.id,
    content: target.textBox.content,
  };

  return {
    projectElementId: target.id,
    projectElementType: ProjectElementType.TEXTBOX,
    updateTextBoxReq,
    textAlignment: target.textAlignment,
  };
};

const convertDividerToUpdatePeReq = (
  target: ProjectElementDataWithDivider
): UpdateProjectElementReqDivider => {
  return {
    projectElementId: target.id,
    projectElementType: ProjectElementType.DIVIDER,
    dividerType: target.dividerType,
  };
};

export const convertPeToUpdateReq = (
  target: ProjectElementData
): UpdateProjectElementReq => {
  switch (target.projectElementType) {
    case ProjectElementType.WORK:
      return convertWorkToUpdatePeReq(target as ProjectElementDataWithWork);
    case ProjectElementType.DETAIL:
      return convertDetailToUpdatePeReq(target as ProjectElementDataWithDetail);
    case ProjectElementType.DOCUMENT:
      return convertDocumentPeToUpdatePeReq(target as ProjectElementDataWithDocument);
    case ProjectElementType.TEXTBOX:
      return convertTextBoxToUpdatePeReq(target as ProjectElementDataWithTextBox);
    case ProjectElementType.DIVIDER:
      return convertDividerToUpdatePeReq(target as ProjectElementDataWithDivider);
    default:
      throw new Error(`Unknown projectElementType`);
  }
};