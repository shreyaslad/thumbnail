import { StackContext, use, Api } from "@serverless-stack/resources";
import { aws_iam as iam } from "aws-cdk-lib";

import { FileStack } from "./FileStack";

export function ApiStack({ stack }: StackContext) {
  const { raw_videos_bucket } = use(FileStack);

  const raw_video_upload_policy = new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ["s3:PutObject"],
    resources: [`${raw_videos_bucket.bucketArn}/*`]
  });

  const api = new Api(stack, "thumbnail-api", {
    routes: {
      "GET /upload": {
        function: {
          handler: "functions/upload.handler",
          permissions: [raw_video_upload_policy],
          environment: {
            RAW_VIDEO_BUCKET_NAME: raw_videos_bucket.bucketName
          }
        },
       }
    },
  });

  api.attachPermissionsToRoute("GET /upload", [raw_video_upload_policy])

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
