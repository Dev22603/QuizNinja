import express from "express";
import {
	toggleUpvote,
	toggleDownvote,
	toggleSaveQuestion,
} from "../controllers/interaction.controller.mjs";
import { protect } from "../middlewares/authMiddleware.mjs"; // Ensure user authentication

const router = express.Router();

router.post("/:question_id/upvote", protect, toggleUpvote);
router.post("/:question_id/downvote", protect, toggleDownvote);
router.post("/:question_id/save", protect, toggleSaveQuestion);

export default router;
