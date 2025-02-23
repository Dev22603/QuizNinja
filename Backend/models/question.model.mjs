// import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema(
// 	{
// 		tenantId: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "Tenant",
// 			required: true, // Ensures each question is linked to a coaching center
// 		},
// 		question: { type: String, required: true, trim: true },
// 		subject_id: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			required: true,
// 			ref: "Subject",
// 		},
// 		created_by: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			required: true,
// 			ref: "User",
// 		},
// 		reference_book_or_source: { type: String, default: "" },
// 		image_url: { type: String, default: "" },
// 		options: [
// 			{
// 				id: { type: Number, required: true }, // Auto-generated serial ID
// 				text: { type: String, required: true },
// 			},
// 		],
// 		correct_option_ids: { type: [Number], required: true }, // Stores IDs of correct options
// 		difficulty: { type: Number, min: 1, max: 5 },
// 	},
// 	{ timestamps: true }
// );

// // // **Pre-save middleware to generate option IDs**
// // questionSchema.pre("save", function (next) {
// // 	if (this.options && this.options.length > 0) {
// // 		this.options.forEach((option, index) => {
// // 			option.id = index + 1; // Assigns a sequential ID (1, 2, 3...)
// // 		});
// // 	}
// // 	next();
// // });

// const Question = mongoose.model("Question", questionSchema);
// export default Question;

import mongoose from "mongoose";

// Define a separate schema for options
const OptionSchema = new mongoose.Schema({
	// Auto-generated serial ID
	id: { type: Number, required: true },
	text: { type: String, required: true },
});

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
		reference_book_or_source: { type: String, default: "" },
		image_url: { type: String, default: "" },
		// Use the OptionSchema as an embedded subdocument
		options: [OptionSchema],
		correct_option_ids: { type: [Number], required: true },
		difficulty: { type: Number, min: 1, max: 5, default: 1 	},
	},
	{ timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
