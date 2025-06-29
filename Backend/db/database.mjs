import mongoose from "mongoose";
import dotenv from "dotenv";
import {config} from "../constants/config.mjs";

dotenv.config();

const dbURI = config.MONGODB_URI;
console.log(dbURI);

const connectDB = async () => {
	try {
		await mongoose.connect(dbURI);
		console.log("MongoDB connected");
	} catch (err) {
		console.error("MongoDB connection error:", err);
	}
};

export default connectDB;
