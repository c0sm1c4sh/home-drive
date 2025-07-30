import boto3
import os
from dotenv import load_dotenv

load_dotenv()

s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)

bucket_name = os.getenv("S3_BUCKET_NAME")

try:
    response = s3.list_objects_v2(Bucket=bucket_name)
    print(f"✅ Connection successful. Objects in bucket '{bucket_name}':")

    if 'Contents' in response:
        for obj in response['Contents']:
            print("-", obj['Key'])
    else:
        print("No files found (bucket is empty).")
except Exception as e:
    print("❌ Connection failed:", e)
