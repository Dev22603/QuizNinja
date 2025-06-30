import * as z from "zod/v4";
import { trimStrings } from "../utils/helper_functions.mjs";
import { REGEX } from "../constants/constants.mjs";

const UserValidationSchema = z.object({
	// tenantId: z.string(),
	name: z
		.string()
		.min(2, "Name must be at least 2 characters long")
		.max(100, "Name must be at most 100 characters long"),
	// role: z.enum(ROLE_LIST).default(ROLES.STUDENT),
	email: z.email().transform((val) => val.toLowerCase()),
	phone_number: z
		.string()
		.regex(
			REGEX.PHONE,
			"Phone number must be 10 digits and cannot start with 0"
		),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(
			REGEX.PASSWORD,
			"Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long"
		),
});

const userLoginSchema = z.object({
	email: z
		.string()
		.email()
		.transform((val) => val.toLowerCase())
		.optional(),
	phone_number: z
		.string()
		.regex(
			REGEX.PHONE,
			"Phone number must be 10 digits and cannot start with 0"
		)
		.optional(),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(
			REGEX.PASSWORD,
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

const validateUserLogin = (user) => {
	const trimmedUser = trimStrings(user);

	// Check if at least one of email or phone_number is provided
	if (!trimmedUser.email && !trimmedUser.phone_number) {
		return {
			errors: ["Either email or phone number is required"],
			message:
				"Validation failed: Either email or phone number is required",
		};
	}

	const result = userLoginSchema.safeParse(trimmedUser);
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
const mongoObjectIdValidationSchema = z.string().regex(REGEX.MONGO_ID_2);
const validateMongoObjectID = (id) => {
	const result = mongoObjectIdValidationSchema.safeParse(id);
	if (!result.success) {
		return {
			errors: ["Invalid user ID"],
			message: "Validation failed: Invalid user ID",
		};
	}
	return {
		data: result.data,
		message: "User validated successfully",
	};
};
export { validateUser, validateUserLogin, validateMongoObjectID };
