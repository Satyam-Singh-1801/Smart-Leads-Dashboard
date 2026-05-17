"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = exports.deleteSalesman = exports.getSalesmen = void 0;
const User_1 = __importDefault(require("../models/User"));
const Lead_1 = __importDefault(require("../models/Lead"));
// @desc    Get all salesmen
// @route   GET /api/admin/users
// @access  Private/Admin
const getSalesmen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salesmen = yield User_1.default.find({ role: 'Sales User' }).select('-password');
        res.json(salesmen);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getSalesmen = getSalesmen;
// @desc    Delete salesman
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteSalesman = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (user && user.role === 'Sales User') {
            // Also delete leads created by this user? Up to business logic, let's keep leads for now, or just delete user.
            yield User_1.default.deleteOne({ _id: user._id });
            res.json({ message: 'Salesman removed' });
        }
        else {
            res.status(404).json({ message: 'Salesman not found or cannot delete Admin' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteSalesman = deleteSalesman;
// @desc    Get analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalLeads = yield Lead_1.default.countDocuments();
        const totalSalesmen = yield User_1.default.countDocuments({ role: 'Sales User' });
        // recent leads
        const recentLeads = yield Lead_1.default.find().sort({ createdAt: -1 }).limit(5).populate('createdBy', 'name');
        // Leads by status
        const leadsByStatus = yield Lead_1.default.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        res.json({
            totalLeads,
            totalSalesmen,
            recentLeads,
            leadsByStatus
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAnalytics = getAnalytics;
