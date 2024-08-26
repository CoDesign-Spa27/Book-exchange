"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const zod_1 = require("zod");
const registerUser = async (req, res) => {
    try {
        const userSchema = zod_1.z.object({
            username: zod_1.z
                .string()
                .min(4, { message: "Username must be at least 4 characters long" }),
            email: zod_1.z.string().email({ message: "Invalid email address" }),
            password: zod_1.z
                .string()
                .min(6, { message: "Password must be at least 6 characters long" }),
            bookPreferences: zod_1.z.array(zod_1.z.string()).optional(),
        });
        const userData = userSchema.parse(req.body);
        const existingUser = await User_1.default.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(409).json({ error: "Email is already in use" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
        const newUser = new User_1.default({
            ...userData,
            password: hashedPassword,
            bookPreferences: userData.bookPreferences || [],
        });
        await newUser.save();
        res.status(201).json({ message: "User Registered Successfully", newUser });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            res.status(400).json({ errors: err.errors });
        }
        else {
            // Handle other errors
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const loginSchema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string(),
        });
        const loginData = loginSchema.parse(req.body);
        const user = await User_1.default.findOne({ email: loginData.email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const passwordMatch = await bcryptjs_1.default.compare(loginData.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, "secret", {
            expiresIn: "24h",
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(400).json({
            error: error,
        });
    }
};
exports.loginUser = loginUser;
const getMe = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(req.user);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.getMe = getMe;
