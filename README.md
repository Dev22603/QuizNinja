# QuizNinja - Backend

![QuizNinja Logo](https://your-logo-url.com/logo.png)

## 🚀 Introduction
QuizNinja is a robust and scalable online examination platform designed to streamline quiz and exam management for educational institutions. The backend is built using **Node.js, Express.js, and MongoDB**, offering a secure and efficient REST API to handle users, questions, exams, and more.



### Key Directories:
- **controllers/**: Handles business logic for various entities (users, exams, questions, etc.).
- **models/**: Mongoose schemas for database entities.
- **routes/**: API endpoints for managing resources.
- **middlewares/**: Authentication, authorization, and file handling.
- **db/**: Database connection setup.
- **utils/**: Utility functions.

## 🛠️ Tech Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication and security
- **Multer** - File uploads
- **bcryptjs** - Password hashing
- **Dotenv** - Environment variables management

## 🌟 Features
\- ✅ User authentication (JWT-based login/logout)
\- ✅ Multi-role access control (Admin, Teacher, Student)
\- ✅ Question and exam management
\- ✅ Subject-wise question categorization
\- ✅ Secure exam attempts with progress tracking
\- ✅ Scoring and result calculation
\- ✅ File upload support for bulk questions


## 🚀 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/quizninja-backend.git
cd quizninja-backend/Backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the `Backend/` directory:
```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4️⃣ Run the Server
For development mode (with nodemon):
```sh
npm run dev
```
For production mode:
```sh
node index.mjs
```

## 🛠️ API Endpoints
### Authentication
| Method | Endpoint         | Description |
|--------|-----------------|-------------|
| POST   | `/api/login`     | User login |
| POST   | `/api/register`  | User registration |

### Questions Management
| Method | Endpoint                      | Description |
|--------|--------------------------------|-------------|
| POST   | `/api/questions/create`        | Add a new question |
| GET    | `/api/questions`               | Retrieve all questions |
| PUT    | `/api/questions/:id`           | Update a question |
| DELETE | `/api/questions/:id`           | Delete a question |

### Exams
| Method | Endpoint                      | Description |
|--------|--------------------------------|-------------|
| POST   | `/api/exams`                   | Create an exam |
| GET    | `/api/exams/:id`               | Retrieve exam details |
| POST   | `/api/exams/:id/start`         | Start an exam attempt |
| PUT    | `/api/exams/:id/save-progress` | Save exam progress |
| POST   | `/api/exams/:id/submit`        | Submit an exam |

## 🛡️ Security & Authentication
- **JWT Authentication**: Protects API endpoints from unauthorized access.
- **Role-Based Access Control (RBAC)**: Limits actions based on user roles.
- **Data Validation**: Ensures proper input handling.

## 🚀 Future Enhancements
- **AI-based question generation**
- **Leaderboard and analytics dashboard**
- **Integration with LMS platforms**
- **Real-time proctoring support**

## 🤝 Contribution
Contributions are welcome! Feel free to fork this repository and submit pull requests.

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---

🚀 Built with ❤️ by **Dev Bachani & Team**

