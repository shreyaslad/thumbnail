import os, json, uuid
import boto3
from botocore.config import Config

s3 = boto3.client("s3", config=Config(signature_version='s3v4')
)
RAW_VIDEO_BUCKET_NAME: str = os.environ.get("RAW_VIDEO_BUCKET_NAME")

def handler(event, context):
  object_key: str = str(uuid.uuid4()) + ".png"

  url = s3.generate_presigned_url(
    ClientMethod="put_object",
    Params={
      "Bucket": RAW_VIDEO_BUCKET_NAME,
      "Key": object_key,
      "ACL": "public-read-write"
    }
  )

  return {
    "statusCode": 200,
    "headers": {
      "Content-Type": "application/json"
    },
    "body": json.dumps({
      "upload_url": url,
      "expires": 3600
    })
  }
