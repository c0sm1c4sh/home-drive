from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_db, init_db
from s3_utils import upload_to_s3, delete_from_s3

app = FastAPI()
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
def upload(file: UploadFile = File(...)):
    if file is None:
        raise HTTPException(status_code=400, detail="No file provided")
    try:
        s3_key = upload_to_s3(file)
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO files (name, s3_path) VALUES (?, ?)", (file.filename, s3_key))
        conn.commit()
        return {"message": "File uploaded", "s3_key": s3_key}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        print("filename:", file.filename)
        print("s3_key:", s3_key)

@app.get("/files")
def list_files():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM files")
    rows = cursor.fetchall()
    return [dict(row) for row in rows]

@app.delete("/delete/{file_id}")
def delete_file(file_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT s3_path FROM files WHERE id = ?", (file_id,))
    result = cursor.fetchone()
    if not result:
        raise HTTPException(status_code=404, detail="File not found")

    delete_from_s3(result["s3_path"])
    cursor.execute("DELETE FROM files WHERE id = ?", (file_id,))
    conn.commit()
    return {"message": "File deleted"}
