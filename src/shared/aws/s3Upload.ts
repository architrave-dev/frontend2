import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { resizeImage } from './resizeImage';

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

export async function uploadToS3(file: File, bucketName: string, aui: string): Promise<AwsS3UploadResult> {
  if (file.size < MIN_SIZE) {
    console.log("file.size 가 너무 작아. 최소 50KB 이상!!")
  }

  const timestamp = Date.now();
  const originalFileKey = `uploads/${aui}/${timestamp}-${file.name}`;
  const thumbnailFileKey = `uploads/${aui}/thumbnails/${timestamp}-${file.name}`;

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

    const originUrl = `https://${bucketName}.s3.amazonaws.com/${originalFileKey}`;
    const thumbnailUrl = `https://${bucketName}.s3.amazonaws.com/${thumbnailFileKey}`;

    return { originUrl, thumbnailUrl };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}