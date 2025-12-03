
# FastAPI + Next.js Full Stack Application

A high-performance full-stack web application built with **FastAPI** (Python) for the backend and **Next.js** (React/TypeScript) for the frontend. This project demonstrates CRUD operations, PostgreSQL database integration, and a modern dashboard UI.

![Project Tech Stack](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Project Tech Stack](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Project Tech Stack](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Project Tech Stack](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

* **FastAPI Backend:** High-performance API with auto-generated documentation.
* **Next.js Frontend:** Modern React framework with TypeScript and Tailwind CSS.
* **Database:** PostgreSQL integration using SQLAlchemy ORM.
* **CRUD Operations:** Create, Read, Update, and Delete products.
* **Search & Filter:** Real-time search functionality.
* **Authentication:** (In Progress) User registration and JWT-based login.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
* **Python 3.10+**
* **Node.js 18+**
* **PostgreSQL Database** (Running locally or in the cloud)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/AnilKumarSingh9856/fastapi_fullstack_project.git](https://github.com/AnilKumarSingh9856/fastapi_fullstack_project.git)
cd fastapi_fullstack_project
````

### 2\. Backend Setup (FastAPI)

Navigate to the root directory (where `main.py` is located).

**Create a virtual environment:**

```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux/macOS
python3 -m venv venv
source venv/bin/activate
```

**Install Dependencies:**

```bash
pip install -r requirements.txt
```

**Configure Database:**

1.  Open `database.py`.
2.  Update the `db_url` variable with your PostgreSQL credentials:
    `postgresql://username:password@localhost:5432/your_db_name`

**Run the Server:**

```bash
uvicorn main:app --reload
```

The backend will start at `http://127.0.0.1:8000`.

  * **API Docs:** Visit `http://127.0.0.1:8000/docs` to see the interactive Swagger UI.

-----

### 3\. Frontend Setup (Next.js)

Open a **new terminal** window and navigate to the frontend folder.

```bash
cd frontend
```

**Install Dependencies:**

```bash
npm install
```

**Run the Development Server:**

```bash
npm run dev
```

The frontend will start at `http://localhost:3000`.

-----

## 📂 Project Structure

```bash
fastapi_fullstack_project/
├── auth/                 # Authentication logic (Routes, Models, Schemas)
├── frontend/             # Next.js Application
│   ├── app/              # React Pages & Components
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
├── database.py           # Database connection
├── database_models.py    # Product Database models
├── main.py               # Backend Entry point
├── models.py             # Pydantic Schemas
├── requirements.txt      # Backend dependencies
└── README.md             # Project documentation
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/new-feature`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

<!-- end list -->

```
