import { RemovalPolicy } from "aws-cdk-lib";
import { StackContext, Bucket } from "sst/constructs";

export function FileStack({ stack }: StackContext) {
  const raw_videos_bucket = new Bucket(stack, "raw-upload-bucket", {
    notifications: {
      video_upload: {
        function: {
          handler: "packages/functions/triggers/raw_video_upload.handler",
        },
        events: ["object_created"]
      }
    },
    cdk: {
      bucket: {
        bucketName: `${stack.stage}-thumbnail-raw-videos`,
        autoDeleteObjects: true,
        removalPolicy: RemovalPolicy.DESTROY
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
