import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
	{
		tenantId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tenant",
			required: true, // Ensures each question is linked to a coaching center
		},
		question: { type: String, required: true, trim: true },
		subject_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Subject",
		},
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		reference_book_or_source: { type: String, default: "" },
		image_url: { type: String, default: "" },
		options: { type: [String], required: true },
		correct_option_ids: { type: [Number], required: true },
		difficulty: { type: Number, min: 1, max: 5 },
	},
	{ timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
