import express from "express";
import {
	createSubject,
	getAllSubjects,
	getSubjectBySubjectCode,
	updateSubject,
	deleteSubject,
} from "../controllers/subject.controller.mjs";
import { authenticate, authorize } from "../middlewares/auth.mjs";

const router = express.Router();

router.post(
	"/subjects",
	authenticate,
	authorize(["hod", "teacher"]),
	createSubject
);
router.get("/subjects", getAllSubjects);
router.get("/subjects/code/:code", getSubjectBySubjectCode);
router.put("/subjects/code/:code", updateSubject);
router.delete("/subjects/code/:code", deleteSubject);

export default router;
