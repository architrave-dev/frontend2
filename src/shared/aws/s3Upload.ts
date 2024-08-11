import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(file: File, bucketName: string): Promise<string> {
  const fileKey = `uploads/${Date.now()}-${file.name}`;

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: file,
    ContentType: file.type,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}