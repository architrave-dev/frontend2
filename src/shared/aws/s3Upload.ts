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
  //공백이 있으면 업로드는 문제가 없는데 보이지가 않음. 공백을 언더바로 변경.
  const replacedFileName = file.name.replaceAll(" ", "_");

  const timestamp = Date.now();
  const originalFileKey = `uploads/${aui}/${timestamp}-${replacedFileName}`;
  const thumbnailFileKey = `uploads/${aui}/thumbnails/${timestamp}-${replacedFileName}`;

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


    // const cloudfrontDomain = process.env.REACT_APP_CLOUDFRONT_URL!
    // console.log("cloudfrontDomain: " + cloudfrontDomain);

    // MVP-1에서 사용
    // S3의 Image url에 직접적으로 접근하는 방법
    const originUrl = `https://${bucketName}.s3.amazonaws.com/${originalFileKey}`;
    const thumbnailUrl = `https://${bucketName}.s3.amazonaws.com/${thumbnailFileKey}`;

    // MVP-2에서 사용
    // cloudfront를 통해 Image url에서 접근하는 방법.
    // S3의 모든 퍼블릭 접근이 제한되었기에, 해당 방법을 사용한다. 
    // const originUrl = `https://${cloudfrontDomain}/${originalFileKey}`;
    // const thumbnailUrl = `https://${cloudfrontDomain}/${thumbnailFileKey}`;


    return { originUrl, thumbnailUrl };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}