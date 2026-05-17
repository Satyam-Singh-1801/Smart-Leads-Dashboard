"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leadController_1 = require("../controllers/leadController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validateMiddleware_1 = require("../middlewares/validateMiddleware");
const validators_1 = require("../validators");
const router = express_1.default.Router();
router.route('/')
    .get(authMiddleware_1.protect, leadController_1.getLeads)
    .post(authMiddleware_1.protect, (0, validateMiddleware_1.validate)(validators_1.leadSchema), leadController_1.createLead);
router.route('/:id')
    .get(authMiddleware_1.protect, leadController_1.getLeadById)
    .put(authMiddleware_1.protect, (0, validateMiddleware_1.validate)(validators_1.leadSchema), leadController_1.updateLead)
    .delete(authMiddleware_1.protect, leadController_1.deleteLead);
exports.default = router;
