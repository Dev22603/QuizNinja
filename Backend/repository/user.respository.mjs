import User from "../models/user.model.mjs";

const saveUser = async (user) => {
	try {
		const savedUser = await User.create(user);
		return savedUser;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export { saveUser };
