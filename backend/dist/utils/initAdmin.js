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
exports.initAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const initAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminExists = yield User_1.default.findOne({ role: 'Admin' });
        if (!adminExists) {
            console.log('No Admin found. Creating default Admin...');
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash('admin123', salt);
            yield User_1.default.create({
                name: 'Super Admin',
                email: 'admin@smartleads.com',
                password: hashedPassword,
                role: 'Admin',
            });
            console.log('Default Admin created: admin@smartleads.com / admin123');
        }
        else {
            console.log('Admin user already exists.');
        }
    }
    catch (error) {
        console.error('Error creating default admin:', error);
    }
});
exports.initAdmin = initAdmin;
