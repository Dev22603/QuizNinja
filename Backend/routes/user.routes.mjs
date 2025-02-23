import express from "express";
import {
	deleteUser,
	getUserById,
	login,
	updateUser,
	registerTeacher,
	registerMultipleTeachers, // Updated function name for clarity
} from "../controllers/user.controller.mjs";
import { authenticate, authorize } from "../middlewares/auth.mjs";
import { uploadTeachersExcel } from "../middlewares/uploads.mjs"; // Middleware for handling file uploads

const router = express.Router();

/* 🚀 AUTHENTICATION ROUTES */
router.post("/auth/login", login);

/* 👤 USER MANAGEMENT ROUTES */
router.get("/users/:id", authenticate, getUserById);
router.put("/users/:id", authenticate, authorize(["hod"]), updateUser);
router.delete("/users/:userId", authenticate, authorize(["hod"]), deleteUser);

/* 🏫 TEACHER REGISTRATION ROUTES */
router.post(
	"/teachers/register",
	authenticate,
	authorize(["hod"]),
	registerTeacher
);
router.post(
	"/teachers/bulk-register",
	authenticate,
	authorize(["hod"]),
	uploadTeachersExcel, // Excel file upload middleware
	registerMultipleTeachers
);

// Export the router
export default router;
