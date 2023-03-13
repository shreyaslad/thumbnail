import { StackContext, Bucket } from "sst/constructs";

export function FileStack({ stack }: StackContext) {
  const raw_videos_bucket = new Bucket(stack, "raw-upload-bucket", {
    cdk: {
      bucket: {
        bucketName: `${stack.stage}-thumbnail-raw-videos`
      }
    }
  });
  
  stack.addOutputs({
    RawVideosBucketArn: raw_videos_bucket.bucketArn,
  });

  return {
    raw_videos_bucket
  }
}
