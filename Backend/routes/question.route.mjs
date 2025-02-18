import express from "express";
import {
	createQuestion,
	getQuestionsBySubject,
	getQuestionsByTeacher,
	getAllQuestions,
	updateQuestion,
	deleteQuestion,
	createMultipleQuestions
} from "../controllers/question.controller.mjs";
import { authenticate, authorize } from "../middlewares/auth.mjs";

const router = express.Router();

// Create a new question (only HOD & Teachers)
router.post(
	"/questions/create",
	authenticate,
	authorize(["hod", "teacher"]),
	createQuestion
);
// Create multiple questions (only HOD & Teachers)
router.post(
    "/questions/create_multiple",
    authenticate,
    authorize(["hod", "teacher"]),
    createMultipleQuestions
);

// Get all questions (with optional sorting)
router.get("/questions", authenticate, getAllQuestions);

// Get all questions of a specific subject
router.get(
	"/questions/subject/:subject_code",
	authenticate,
	getQuestionsBySubject
);

// Get all questions created by a specific teacher
router.get("/questions/teacher/:username", authenticate, getQuestionsByTeacher);

// Update a question by ID (only HOD & Teachers)
router.put(
	"/questions/:id",
	authenticate,
	authorize(["hod", "teacher"]),
	updateQuestion
);
// Delete a question by ID (only HOD and Teachers)
router.delete(
	"/questions/:id",
	authenticate,
	authorize(["hod", "teacher"]),
	deleteQuestion
);

export default router;
