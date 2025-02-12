import mongoose from "mongoose";

const questionInteractionSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		question_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Question",
		},
		upvoted: { type: Boolean, default: false },
		downvoted: { type: Boolean, default: false },
		saved: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default mongoose.model("QuestionInteraction", questionInteractionSchema);
