import { aws_s3 } from 'aws-cdk-lib'
import { StackContext, Bucket } from "@serverless-stack/resources";

export function FileStack({ stack }: StackContext) {
  const RAW_VIDEOS_BUCKET_NAME: string = "thumbnail-raw-videos"

  const raw_videos_bucket = aws_s3.Bucket.fromBucketName(stack, "thumbnail-raw-videos",
    RAW_VIDEOS_BUCKET_NAME
  );

  stack.addOutputs({
    RawVideoBucketArn: raw_videos_bucket.bucketArn
  });

  return {
    raw_videos_bucket
  }
}
