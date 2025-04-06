import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
	try {
		const result = await cloudinary.uploader.upload(filePath, {
			folder: "storage/input_images",
			use_filename: true,
			unique_filename: false,
		});
		return result.secure_url;
	} catch (error) {
		console.error("Cloudinary upload failed:", error.message);
		throw error;
	}
};
