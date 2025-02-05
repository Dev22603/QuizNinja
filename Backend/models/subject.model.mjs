import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
	subject_name: { type: String, required: true, trim: true },
	subject_code: { type: String, unique: true, sparse: true, trim: true }, // Unique constraint
	subject_description: { type: String, default: "" },
});

export default mongoose.model("Subject", subjectSchema);
