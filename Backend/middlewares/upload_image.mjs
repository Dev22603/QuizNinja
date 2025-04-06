import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure temp folder exists
const tempDir = path.join("tmp");
if (!fs.existsSync(tempDir)) {
	fs.mkdirSync(tempDir);
}

// Multer config for temporary storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, tempDir);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

export const uploadImagesMiddleware = upload.array("files", 10); 
