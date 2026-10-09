# ApplyTrack

> **Track every application. Land your next opportunity.**

ApplyTrack is a full-stack job application tracking platform built with Next.js, FastAPI, and MySQL. It enables users to organize job applications, monitor recruitment progress, schedule interviews, and visualize job-search analytics through a responsive, modern SaaS dashboard.

---

## 🌟 Key Features

- **Application Tracking Pipeline**: Manage jobs across all stages (*Applied*, *Interview*, *Technical Round*, *Offer*, *Rejected*).
- **Interactive Analytics**: Monitor KPI metrics, conversion rates (Interview Rate, Offer Rate), and status distribution charts.
- **Interview Scheduling**: Track phone screens, HR rounds, technical interviews, and dates with dedicated upcoming views.
- **Search, Filter & Server-Side Pagination**: Instantly search by company or position, and filter by status or date.
- **JWT Authentication & Authorization**: Secure password hashing with bcrypt, JSON Web Token sessions, and isolated user application databases.
- **Fully Responsive Light Theme SaaS UI**: Crafted with Inter typography, clean whitespace, card layouts, and mobile drawer navigation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS v4 with custom ApplyTrack design tokens
- **Icons**: Lucide React
- **Data Visualization**: Recharts

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **ORM & Migrations**: SQLAlchemy 2.0 & Alembic
- **Validation**: Pydantic v2
- **Auth**: JWT (python-jose), Passlib (bcrypt)
- **Database**: MySQL (compatible with local SQLite development fallback)
- **Testing**: Pytest, HTTPX

---

## 📁 Project Structure

```text
ApplyTrack/
│
├── frontend/                     # Next.js TypeScript Frontend
│   ├── src/
│   │   ├── app/                  # App Router pages and layouts
│   │   ├── components/           # UI and domain components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # API client and utility helpers
│   │   └── types/                # TypeScript interface definitions
│   ├── public/                   # Static assets
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                      # FastAPI Python Backend
│   ├── app/
│   │   ├── core/                 # Config and security
│   │   ├── db/                   # Database engine, sessions, and models
│   │   ├── dependencies/         # Auth and session dependencies
│   │   ├── routers/              # API route controllers
│   │   ├── schemas/              # Pydantic request/response models
│   │   ├── services/             # Core business logic
│   │   ├── utils/                # Date and validation utilities
│   │   └── main.py               # FastAPI application entrypoint
│   ├── alembic/                  # Database migration scripts
│   ├── tests/                    # Pytest test suite
│   └── requirements.txt          # Python dependencies
│
├── docs/                         # Project documentation
├── screenshots/                  # Application screenshots
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore configuration
├── LICENSE                       # MIT License
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm**: v9.0 or higher
- **Python**: 3.10 or higher
- **MySQL** (Optional for production, SQLite is ready for local development)

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # Linux/macOS
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

5. Start the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

6. Open interactive Swagger API documentation at:
   [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   [http://localhost:3000](http://localhost:3000)

---

## 🧪 Running Backend Tests

```bash
cd backend
pytest -v
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
