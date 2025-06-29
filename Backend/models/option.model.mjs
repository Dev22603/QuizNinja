import mongoose from "mongoose";

// Define a separate schema for options
const optionSchema = new mongoose.Schema(
	{
		id: { type: Number, required: true }, // Auto-generated serial ID
		text: { 
			type: String, 
			required: function() { 
				return !this.imageUrl; // Text is required if imageUrl is not provided
			} 
		},
		imageUrl: { 
			type: String,
			required: function() {
				return !this.text; // imageUrl is required if text is not provided
			}
		}
	},
	{ _id: false } // Disables automatic _id creation for subdocuments
);

// Add a validator to ensure at least one of text or imageUrl is provided
optionSchema.pre('validate', function(next) {
	if (!this.text && !this.imageUrl) {
		this.invalidate('text', 'Either text or imageUrl must be provided');
	}
	next();
});

export default optionSchema;
