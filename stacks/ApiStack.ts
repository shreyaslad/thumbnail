import { aws_iam, aws_s3 } from "aws-cdk-lib";
import { StackContext, use, Api } from "sst/constructs";

export function ApiStack({ stack }: StackContext) {
  const raw_videos_bucket = aws_s3.Bucket.fromBucketName(
    stack, "api-raw-videos-ibucket",
    `${stack.stage}-thumbnail-raw-videos`
  );

  const api = new Api(stack, "api", {
    routes: {
      "GET /url": {
        function: {
          handler: "packages/functions/api/url.handler",
          environment: {
            "RAW_VIDEOS_BUCKET_NAME": raw_videos_bucket.bucketName
          },
          permissions: [
            new aws_iam.PolicyStatement({
              effect: aws_iam.Effect.ALLOW,
              actions: ["s3:*"],
              resources: [raw_videos_bucket.bucketArn]
            })
          ]
        }
      }
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
