# 🚀 Log Ingestion and Querying System

![System Architecture](https://img.shields.io/badge/architecture-full--stack-blue)
![Tech Stack](https://img.shields.io/badge/tech%20stack-React%20%2B%20Node.js%20%2B%20Express-brightgreen)
![Data Storage](https://img.shields.io/badge/storage-JSON%20file%20DB-orange)

A **professional-grade log management system** designed to ingest, store, and search log data efficiently with an intuitive UI for developers.

![image](https://github.com/user-attachments/assets/5200e096-198e-4df2-8bf8-9ea9d603da1b)


---

## 📌 Features

### 🔁 Log Ingestion
- RESTful API endpoint for accepting logs
- JSON schema validation for incoming logs
- Atomic writes to a persistent JSON file

### 🔍 Log Querying
- Full-text search on `message` field
- Advanced filters:  
  - Log level (`error`, `warn`, `info`, `debug`)  
  - Resource ID  
  - Trace ID / Span ID  
  - Commit Hash  
  - Timestamp range
- Reverse-chronological results

### 📊 User Interface
- Responsive React dashboard
- Color-coded log level indicators
- Filters with search & dropdowns
- Clean, accessible layout with MUI & Framer Motion
- Debounced inputs for optimized UX

---

## 🛠 Tech Stack

### Frontend
- React 18
- Material UI (MUI)
- Framer Motion
- Axios
- Tailwind CSS (optional)
- date-fns

### Backend
- Node.js 16+
- Express.js
- Native FileSystem
- CORS

### Storage
- JSON file (no external DB required)

---

## ⚙️ Installation & Setup

### ✅ Prerequisites

Ensure the following tools are installed:

- [Node.js v16+](https://nodejs.org/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- [Git](https://git-scm.com/downloads)

---

### 📦 Clone the Repository

```bash

git clone https://github.com/sohamsk13/Log-Ingestion-System.git
cd Log-Ingestion-System


🔧 Backend Setup



cd backend
npm install
node server.js

Add New Terminal

🔧 Frontend Setup

cd frontend
npm install
npm start


This will launch the frontend at:

🔗 http://localhost:3000

