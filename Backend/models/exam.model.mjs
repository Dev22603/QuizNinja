import mongoose from "mongoose";
const examSchema = new mongoose.Schema(
	{
		number_of_questions: {
			type: Number,
			required: true,
		},
		time_required: { type: Number, min: 5 },
		upvote: { type: Number, default: 0 },
		downvote: { type: Number, default: 0 },
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
		created_at: { type: Date, default: Date.now },
	},
	{
		timestamps: { createdAt: "created_at" },
	}
);
