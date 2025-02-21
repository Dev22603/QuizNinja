// controllers\user.controller.mjs
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.mjs";
import Tenant from "../models/tenant.model.mjs";


const login = async (req, res) => {
    const { username, email, phone_number, password } = req.body;

    const trimmedUsername = username?.trim().toLowerCase();
    const trimmedEmail = email?.trim().toLowerCase();
    const trimmedPhoneNumber = phone_number?.trim();
    const trimmedPassword = password.trim();

    if ((!email && !phone_number && !trimmedUsername) || !password) {
        return res.status(400).json({
            error: "(Email or phone number or username) and password are required",
        });
    }

    try {
        const user = await User.findOne({
            $or: [{ email }, { phone_number }, { trimmedUsername }],
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        console.log(user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                username: user.trimmedUsername,
                tenantId: user.tenantId,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,
            userId: user._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params; // Extract user ID from request parameters
        const user = await User.findById(id).select("-password"); // Exclude password field

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params; // Extract user ID from request parameters
        const user = await User.findOne({ username: username }).select(
            "-password"
        ); // Exclude password field

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Extract user ID from request parameters
        const updates = req.body; // Get update fields from request body
        console.log(updates);

        if (updates.password) {
            return res.status(400).json({
                success: false,
                message: "Password cannot be updated here",
            });
        }

        if (updates._id) {
            return res.status(400).json({
                success: false,
                message: "_id cannot be updated as it is immutable",
            });
        }

        // Find user by ID and update
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { ...updates, updated_at: Date.now() }, // Set updated timestamp
            { new: true, runValidators: true, select: "-password" } // Return updated document & exclude password
        );

        if (!updatedUser) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Check if user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role == "hod") {
            const tenant = await Tenant.findById(user.tenantId);
            if (!tenant) {
                return res.status(404).json({ message: "Tenant not found" });
            } else {
                tenant.owner = null;
                await tenant.save();
            }
        }
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting user" });
    }
};

export {
    signup,
    login,
    getUserById,
    updateUser,
    deleteUser,
    getUserByUsername,
};
