"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const matchmaking_1 = __importDefault(require("./routes/matchmaking"));
const exchangeRoutes_1 = __importDefault(require("./routes/exchangeRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddlewares_1 = require("./middlewares/authMiddlewares");
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api', bookRoutes_1.default);
app.use('/api', authMiddlewares_1.protect, matchmaking_1.default);
app.use('/api', exchangeRoutes_1.default);
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
    console.error('MONGO_URL is not defined in the environment variables.');
    process.exit(1); // Exit the process if the MongoDB URI is missing
}
// Database connection
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the connection fails
});
