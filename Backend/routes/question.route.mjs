import express from "express";
import {
	createQuestion,
	getQuestionsBySubject,
	getQuestionsByTeacher,
	getAllQuestions,
	updateQuestion,
	deleteQuestion,
	createMultipleQuestions, 
	uploadImages
} from "../controllers/question.controller.mjs";
import { authenticate, authorize } from "../middlewares/auth.mjs";
import { ROLES } from "../constants/constants.mjs";
import { uploadImagesMiddleware } from "../middlewares/upload_image.mjs";

const router = express.Router();

// Create a new question (only HOD & Teachers)
router.post(
	"/questions/create",
	authenticate,
	authorize([ROLES.HOD, ROLES.TEACHER]),
	createQuestion
);
// Create multiple questions (only HOD & Teachers)
router.post(
    "/questions/create_multiple",
    authenticate,
    authorize([ROLES.HOD, ROLES.TEACHER]),
    createMultipleQuestions
);
router.post(
    "/questions/upload_images",
    authenticate,
    authorize([ROLES.HOD, ROLES.TEACHER]),
	uploadImagesMiddleware,
    uploadImages
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
	authorize([ROLES.HOD, ROLES.TEACHER]),
	updateQuestion
);
// Delete a question by ID (only HOD and Teachers)
router.delete(
	"/questions/:id",
	authenticate,
	authorize([ROLES.HOD, ROLES.TEACHER]),
	deleteQuestion
);

export default router;
