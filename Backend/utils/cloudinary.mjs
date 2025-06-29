import { v2 as cloudinary } from "cloudinary";
import {config} from "../constants/config.mjs";

cloudinary.config({
	cloud_name: config.CLOUDINARY_CLOUD_NAME,
	api_key: config.CLOUDINARY_API_KEY,
	api_secret: config.CLOUDINARY_API_SECRET,
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
