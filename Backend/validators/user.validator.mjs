import * as z from "zod/v4";
import { trimStrings } from "../utils/helper_functions.mjs";
// import { ROLES } from "../constants/constants.mjs";

const UserValidationSchema = z.object({
	// tenantId: z.string(),
	name: z
		.string()
		.min(2, "Name must be at least 2 characters long")
		.max(100, "Name must be at most 100 characters long"),
	// role: z.enum(Object.values(ROLES)).default(ROLES.STUDENT),
	email: z.email(),
	phone_number: z
		.string()
		.regex(
			/^[1-9]\d{9}$/,
			"Phone number must be 10 digits and cannot start with 0"
		),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:'",.<>/?~`])(?=.{8,})/,
			"Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long"
		),
});

const validateUser = (user) => {
	const trimmedUser = trimStrings(user);
	const result = UserValidationSchema.safeParse(trimmedUser);
	if (!result.success) {
		const errorsMessages = result.error.issues.map(
			(issue) => issue.message
		);
		return {
			errors: errorsMessages,
			message: "User validation failed",
		};
	}
	return {
		data: result.data,
		message: "User validated successfully",
	};
};

// const res = validateUser({
// 	name: "e",
// 	email: "john.doeexample.com",
// 	phone_number: "234567890",
// 	password: "passwrd123",
// });
// console.log(res);
const validateMultipleUsers = (users) => {
	const results = users.map((user) => validateUser(user));
	return results;
};

export { validateUser, validateMultipleUsers };
