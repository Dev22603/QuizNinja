import express from "express";

import {
	deleteUser,
	getUserById,
	getUserByUsername,
	login,
	signup,
	updateUser,
	
} from "../controllers/user.controller.mjs";
import { authenticate, authorize } from "../middlewares/auth.mjs";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.get("/users/:id", getUserById);
router.get("/users/u/:username", getUserByUsername);
router.delete("/users/:userId", authenticate, authorize(["hod"]), deleteUser);
router.put("/users/:id", authenticate, authorize(["hod"]), updateUser);

// export the route
export default router;
