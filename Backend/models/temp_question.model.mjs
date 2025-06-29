import mongoose from "mongoose";
const tempQuestionSchema = new mongoose.Schema(
	{
		question: { type: String, trim: true },
		options: {
			type: [optionSchema],
			validate: {
				
				validator: function (arr) {
					return arr.length === 4;
				},
				message: "Exactly 4 options are required.",
			},
		},
		correct_option_ids: { type: [Number] },
	},
	{ timestamps: true }
);

const TempQuestion = mongoose.model("TempQuestion", tempQuestionSchema);
export default TempQuestion;
