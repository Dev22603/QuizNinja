import mongoose from "mongoose";
import optionSchema from "./option.model.mjs";

// Define the main question schema that uses the OptionSchema
const questionSchema = new mongoose.Schema(
	{
		tenantId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tenant",
			required: true,
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
		source: { type: String, default: "" },
		image_url: { type: String, default: "" },
		// Use the OptionSchema as an embedded subdocument
		options: {
			type: [optionSchema],
			validate: {
				validator: function (arr) {
					return arr.length === 4;
				},
				message: "Exactly 4 options are required.",
			},
		},
		correct_option_ids: { type: [Number], required: true },
		difficulty: { 
			type: String, 
			enum: ['easy', 'medium', 'hard'], 
			default: 'easy',
			lowercase: true
		},
		chapter: { type: String, default: "" },
	},
	{ timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
