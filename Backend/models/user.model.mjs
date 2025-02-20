import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		tenantId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tenant",
			required: true, // Ensures each user belongs to a coaching center
		},
		name: { type: String, required: true, minlength: 2 },
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			match: [/^[a-z_]+$/, "Username can only contain lowercase letters and underscores"],
		},
		role: {
			type: String,
			enum: ["student", "teacher", "hod", "admin"],
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [
				/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
				"Please fill a valid email address",
			],
		},
		phone_number: {
			type: String,
			required: true,
			match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
		},
		created_at: { type: Date, default: Date.now },
		updated_at: { type: Date, default: Date.now },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

const User = mongoose.model("User", userSchema);
export default User;
