import User from "../models/user.model.mjs";
import { REGEX } from "../constants/constants.mjs";
import { validateMongoObjectID } from "../validators/user.validator.mjs";
const saveUser = async (user) => {
	try {
		const savedUser = await User.create(user);
		return savedUser;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
const getUserById = async (id) => {
	try {
		if (!REGEX.MONGO_ID_2.test(id)) {
			const error = validateMongoObjectID(id);
			error.statusCode = 400;
			if (error) {
				return { user: null, error };
			}
		}
		const user = await User.findById(id).select("-password");
		if (!user) {
			const error = new Error("User not found");
			error.statusCode = 404;
			return { user: null, error };
		}
		return { user, error: null };
	} catch (error) {
		error.statusCode = 500;
		console.error("[Repository Error] getUserById:", error);
		return { user: null, error: error };
	}
};

export { saveUser, getUserById };
