import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { resizeImage } from './resizeImage';
import { ServiceType } from '../enum/EnumRepository';

const MIN_SIZE = 1024 * 50;
const TARGET_SIZE = 50; //50KB

interface AwsS3UploadResult {
  originUrl: string;
  thumbnailUrl: string;
}

const s3Client = new S3Client({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(file: File, aui: string, serviceType: ServiceType, identifier: string[],): Promise<AwsS3UploadResult> {
  if (file.size < MIN_SIZE) {
    console.log("file.size 가 너무 작아. 최소 50KB 이상!!")
  }
  const prefix = makePrefix(serviceType, identifier);

  const bucketName = process.env.REACT_APP_S3_BUCKET_NAME!;
  const originalFileKey = `uploads/${aui}/${prefix}/origin-${file.name}`;
  const thumbnailFileKey = `uploads/${aui}/${prefix}/thumbnails-${file.name}`;
  const originParams = {
    Bucket: bucketName,
    Key: originalFileKey,
    Body: file,
    ContentType: file.type,
  };

  const thumbnailBlob = await resizeImage(file, TARGET_SIZE);

  const thumbnailParams = {
    Bucket: bucketName,
    Key: thumbnailFileKey,
    Body: thumbnailBlob,
    ContentType: file.type,
  };

  try {
    await s3Client.send(new PutObjectCommand(originParams));
    await s3Client.send(new PutObjectCommand(thumbnailParams));

    // MVP-1에서 사용
    // S3의 Image url에 직접적으로 접근하는 방법
    const originUrl = `https://${bucketName}.s3.amazonaws.com/${originalFileKey}`;
    const thumbnailUrl = `https://${bucketName}.s3.amazonaws.com/${thumbnailFileKey}`;

    return { originUrl, thumbnailUrl };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}

async function deleteFromS3(fileKey: string): Promise<void> {
  const deleteParams = {
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME!,
    Key: fileKey,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log(`Successfully deleted file from S3: ${fileKey}`);
  } catch (error) {
    console.error(`Error deleting file from S3 (${fileKey}):`, error);
    throw error;
  }
}

export async function deleteFileAndThumbnail(prevImgUrl: string, aui: string): Promise<void> {
  //여기서 순수 image filename 추출한 후
  const fileName = extractFileName(prevImgUrl);
  try {
    const originalFileKey = `uploads/${aui}/${fileName}`;
    const thumbnailFileKey = `uploads/${aui}/thumbnails/${fileName}`;

    await deleteFromS3(originalFileKey);
    await deleteFromS3(thumbnailFileKey);
  } catch (error) {
    throw error;
  }
}

const extractFileName = (url: string): string | null => {
  const match = url.match(/([^/]+\.(?:jpe?g|png|gif|webp|svg))$/i);
  return match ? match[1] : null;
};

const getMimeTypeFromBase64 = (base64: string): string => {
  // Base64의 헤더 부분에서 MIME 타입 추출
  const mimeMatch = base64.match(/^data:(.+);base64,/);
  if (mimeMatch) {
    return mimeMatch[1]; // MIME 타입 반환 (예: "image/jpeg")
  }
  throw new Error("Invalid Base64 string"); // 잘못된 Base64 데이터 처리
}

const makePrefix = (serviceType: ServiceType, identifier: string[]): string => {
  switch (serviceType) {
    case ServiceType.WORK:
      return `work/${identifier[0]}`;
    case ServiceType.PROJECT:
      return `project/${identifier[0]}`;
    case ServiceType.DETAIL:
      return `work/${identifier[0]}/detail/${identifier[1]}`;
    case ServiceType.DOCUMENT:
      return `project/${identifier[0]}/document/${identifier[1]}`;
    case ServiceType.MEMBER_INFO:
      return `memberInfo`;
    case ServiceType.BILLBOARD:
    default:
      return `billboard`;
  }
}
const makeFilename = (mimeType: string): string => {
  const fileExtension = mimeType.split("/")[1];
  return `${Date.now()}.${fileExtension}`;
}

export const base64ToFileWithMime = (base64: string): File => {
  const mimeType = getMimeTypeFromBase64(base64); // MIME 타입 추출
  const base64Data = base64.split(',')[1]; // Base64 헤더 제거
  const binaryData = atob(base64Data); // Base64를 디코딩하여 바이너리 데이터로 변환

  // 바이너리 데이터를 Uint8Array로 변환
  const arrayBuffer = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    arrayBuffer[i] = binaryData.charCodeAt(i);
  }
  // Blob 생성
  const blob = new Blob([arrayBuffer], { type: mimeType });
  // File 객체 생성
  return new File([blob], makeFilename(mimeType), { type: mimeType });
}

export const convertS3UrlToCloudFrontUrl = (s3Url: string): string => {
  if (s3Url === "") return s3Url;
  const s3Domain = process.env.REACT_APP_BUCKET_DOMAIN!;
  const cloudFrontDomain = process.env.REACT_APP_DOMAIN!;

  try {
    const url = new URL(s3Url);
    if (url.hostname === s3Domain) {
      url.hostname = cloudFrontDomain;
    }
    return url.toString();
  } catch (error) {
    console.error("Invalid URL:", error);
    return s3Url;
  }
}