import express from "express";
import {
	toggleUpvote,
	toggleDownvote,
	toggleSaveQuestion,
} from "../controllers/interaction.controller.mjs";
import { authenticate } from "../middlewares/auth.mjs"; // Ensure user authentication

const router = express.Router();

router.post("/:question_id/upvote", authenticate, toggleUpvote);
router.post("/:question_id/downvote", authenticate, toggleDownvote);
router.post("/:question_id/save", authenticate, toggleSaveQuestion);

export default router;
