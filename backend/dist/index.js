"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const leadRoutes_1 = __importDefault(require("./routes/leadRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
// Load env vars
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const initAdmin_1 = require("./utils/initAdmin");
// Connect to MongoDB
(0, db_1.default)().then(() => {
    (0, initAdmin_1.initAdmin)();
});
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/leads', leadRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Error handling middleware
app.use(errorMiddleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
