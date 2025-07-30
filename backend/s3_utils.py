import boto3
import os
from uuid import uuid4
from dotenv import load_dotenv
from fastapi import UploadFile

load_dotenv()

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)

BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

def upload_to_s3(file: UploadFile):
    if not file.filename:
        raise ValueError("Invalid file - missing filename")

    file_extension = file.filename.split(".")[-1]
    unique_name = f"{uuid4()}.{file_extension}"
    
    if not BUCKET_NAME or not isinstance(BUCKET_NAME, str):
        raise ValueError("BUCKET_NAME is not set or invalid")

    s3.upload_fileobj(file.file, BUCKET_NAME, unique_name)

    return unique_name


def delete_from_s3(file_key):
    s3.delete_object(Bucket=BUCKET_NAME, Key=file_key)
