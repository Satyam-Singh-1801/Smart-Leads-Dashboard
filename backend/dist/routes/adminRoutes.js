"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.protect);
router.use(authMiddleware_1.adminOnly);
router.route('/users').get(adminController_1.getSalesmen);
router.route('/users/:id').delete(adminController_1.deleteSalesman);
router.route('/analytics').get(adminController_1.getAnalytics);
exports.default = router;
