import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    subject_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Subject" },
    created_by: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    reference_book_or_source: { type: String, default: "" },
    image_url: { type: String, default: "" },
    options: { type: [String], required: true },
    correct_option_ids: { type: [Number], required: true },
    time_required: { type: Number, required: true, min: 1 },
    upvote: { type: Number, default: 0 },
    downvote: { type: Number, default: 0 },
    saved_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
