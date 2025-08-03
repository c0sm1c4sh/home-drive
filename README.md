# 🗂️ Home-Drive – A Minimal Google Drive Clone

Home‑Drive is a simple and self-hosted cloud file manager that allows users to upload, view, and delete files, mimicking basic functionality of Google Drive. It uses AWS S3 for storage, FastAPI for the backend, and React for the frontend. The entire stack is containerized using Docker and ready for deployment on cloud platforms like AWS EC2.

---

## 🚀 Features

- ✅ Upload files to AWS S3
- 📂 List uploaded files with preview option
- ❌ Delete files from cloud storage
- 🌐 FastAPI-based backend with RESTful endpoints
- 🖥️ React-based frontend UI
- 🐳 Dockerized for easy deployment
- 🔒 CORS configured and .env support for secrets

---

## 🛠️ Tech Stack

- **Frontend**: React
- **Backend**: FastAPI (Python)
- **Storage**: AWS S3
- **Deployment**: Docker, Docker Compose
- **Hosting (tested)**: AWS EC2

---

## 📦 Folder Structure

home-drive/
├── backend/
│ ├── main.py # FastAPI app
│ ├── database.py # DB connection (if needed later)
│ ├── s3_utils.py # Upload/Delete logic with S3
│ ├── requirements.txt
│ └── Dockerfile
├── frontend/
│ └── [React App]
├── docker-compose.yml
└── .env # Your secrets

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/c0sm1c4sh/home-drive.git
cd home-drive
```

2. Configure Environment
Create a .env file in the root directory:

```bash
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=ap-south-1
S3_BUCKET_NAME=your_bucket_name
REACT_APP_BACKEND_URL=http://<your-ec2-ip>:8000
```

3. Run with Docker Compose
```bash
docker-compose up --build
```

Your app should now be live at:

Frontend: http://localhost:3000

Backend: http://localhost:8000/docs (Swagger UI)

---

🌍 Deployment Notes
Tested on AWS EC2 (Ubuntu)

Expose ports 3000 (frontend) and 8000 (backend) via security group

Use Elastic IP to preserve public IP address

Backend must be reachable from the frontend (REACT_APP_BACKEND_URL)

---

📌 TODOs
 User authentication

 Folder support

 File search

 Drag-and-drop uploads

---

📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ by c0sm1c4sh
