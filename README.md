# 🚀 Web App Task – Full Stack (Frontend + Backend)

A scalable full-stack web application built with:

- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🟢 Node.js + Express
- 🍃 MongoDB
- 🔐 JWT Authentication

This project includes secure authentication and a task management dashboard with full CRUD functionality.

---

# 📌 Features

## 🔐 Authentication
- User Registration
- User Login
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes
- Logout functionality

## 📊 Dashboard
- Create Task
- View Tasks
- Edit Task
- Delete Task
- Responsive UI
- Empty state handling

## 🛡 Security
- Password hashing (bcrypt)
- JWT middleware validation
- Protected backend routes
- Environment variable usage

---

# 🗂 Project Structure

web-app-task/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── vite.config.js
│
└── README.md

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository

```bash
git clone <your-repo-link>
cd web-app-task

🟢 Backend Setup
Go to backend folder:
cd backend

Install dependencies:
npm install

Create .env file:
PORT=5000
MONGODB_URL=<your_mongodb_uri>
JWT_SECRET=<your_secret_key>

Start backend server:
npm start


Backend will run at:

http://localhost:5000

⚛️ Frontend Setup
Go to frontend folder:
cd frontend

Install dependencies:
npm install

Start frontend:
npm run dev


Frontend will run at:

http://localhost:5173

🔄 API Endpoints:-

🔐 Auth Routes
Method	Endpoint	        Description
POST	/api/auth/register	Register user
POST	/api/auth/login	    Login user

👤 User
Method	Endpoint	        Description
GET	/api/user/profile	    Get user profile

📝 Tasks
Method	Endpoint	        Description
GET	/api/tasks	            Get all tasks
POST	/api/tasks	        Create task
PUT	/api/tasks/:id	        Update task
DELETE	/api/tasks/:id	    Delete task

🌍 Production Scalability Notes

To scale this application for production:

Use environment-specific configs 

Use HTTPS

JWT stored in localStorage (for simplicity)

Implement rate limiting

Add pagination for tasks

Use MongoDB Atlas production cluster 

🧠 Tech Stack

Frontend:-
React (Vite)
Tailwind CSS
Axios
React Router DOM

Backend:-
Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt

📎 Submission Notes:-

Functional authentication

Secure backend

Clean project structure

Responsive UI

Full CRUD operations implemented

⭐ Thank you for reviewing this project.