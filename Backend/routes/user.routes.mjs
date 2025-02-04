import express from "express";

import { deleteUser, getUserById, login, signup, updateUser } from "../controllers/user.controller.mjs";

const router = express.Router();
// signup
router.post("/auth/signup", signup);
// login
router.post("/auth/login", login);
router.get("/users/:id", getUserById);
router.delete("/users/:userId", deleteUser);
router.put("/users/:id", updateUser);
// export the route
export default router;
