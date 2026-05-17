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
exports.deleteLead = exports.updateLead = exports.createLead = exports.getLeadById = exports.getLeads = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
// @desc    Get all leads with filtering, sorting, pagination
// @route   GET /api/leads
// @access  Private
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { status, source, search, sortBy = 'createdAt', sortOrder = 'desc', page = '1', limit = '10' } = req.query;
        const query = {};
        if (status)
            query.status = status;
        if (source)
            query.source = source;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        // Role-based filtering
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'Admin') {
            query.createdBy = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        }
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;
        const sortOpt = {};
        sortOpt[sortBy] = sortOrder === 'asc' ? 1 : -1;
        const total = yield Lead_1.default.countDocuments(query);
        const leads = yield Lead_1.default.find(query)
            .sort(sortOpt)
            .skip(skip)
            .limit(limitNum)
            .populate('createdBy', 'name email');
        res.json({
            leads,
            pagination: {
                total,
                page: pageNum,
                pages: Math.ceil(total / limitNum),
                limit: limitNum
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getLeads = getLeads;
// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
const getLeadById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const lead = yield Lead_1.default.findById(req.params.id).populate('createdBy', 'name email');
        if (lead) {
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'Admin' && lead.createdBy._id.toString() !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString())) {
                res.status(403).json({ message: 'Not authorized to view this lead' });
                return;
            }
            res.json(lead);
        }
        else {
            res.status(404).json({ message: 'Lead not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getLeadById = getLeadById;
// @desc    Create new lead
// @route   POST /api/leads
// @access  Private
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, status, source } = req.body;
        const lead = new Lead_1.default({
            name,
            email,
            status: status || 'New',
            source,
            createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
        });
        const createdLead = yield lead.save();
        res.status(201).json(createdLead);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createLead = createLead;
// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
const updateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const lead = yield Lead_1.default.findById(req.params.id);
        if (lead) {
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'Admin' && lead.createdBy.toString() !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString())) {
                res.status(403).json({ message: 'Not authorized to update this lead' });
                return;
            }
            lead.name = req.body.name || lead.name;
            lead.email = req.body.email || lead.email;
            lead.status = req.body.status || lead.status;
            lead.source = req.body.source || lead.source;
            const updatedLead = yield lead.save();
            res.json(updatedLead);
        }
        else {
            res.status(404).json({ message: 'Lead not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateLead = updateLead;
// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const lead = yield Lead_1.default.findById(req.params.id);
        if (lead) {
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'Admin' && lead.createdBy.toString() !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString())) {
                res.status(403).json({ message: 'Not authorized to delete this lead' });
                return;
            }
            yield Lead_1.default.deleteOne({ _id: lead._id });
            res.json({ message: 'Lead removed' });
        }
        else {
            res.status(404).json({ message: 'Lead not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteLead = deleteLead;
