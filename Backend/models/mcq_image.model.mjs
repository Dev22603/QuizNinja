import mongoose from "mongoose";

const mcqImageSchema = new mongoose.Schema(
	{
		tenantId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tenant",
			required: true,
		},
		image_urls: {
			type: [String],
			required: true,
			validate: {
				validator: (arr) => arr.length > 0,
				message: "At least one image URL is required.",
			},
		},
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
		status: {
			type: String,
			enum: ["pending", "done"],
			default: "pending",
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
		questions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "TempQuestion",
			},
		],
	},
	{ timestamps: true }
);

const McqImage = mongoose.model("McqImage", mcqImageSchema);
export default McqImage;
