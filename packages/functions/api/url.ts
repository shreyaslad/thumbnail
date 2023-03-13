import { ApiHandler } from "sst/node/api";
import { Time } from "@thumbnail/core/time";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { v4 as uuidv4 } from "uuid";

const client = new S3Client({ region: "us-west-2" });

const BUCKET_NAME: string | undefined = process.env.RAW_VIDEOS_BUCKET_NAME;
const URL_EXPIRATION = 3600;

export const handler = ApiHandler(async (_evt) => {

  const KEY_NAME: string = uuidv4();

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: KEY_NAME,
    ACL: "public-read"
  });

  const url = await getSignedUrl(client, command, { expiresIn: URL_EXPIRATION });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"url": url, "expires_in": URL_EXPIRATION}),
  };
});
