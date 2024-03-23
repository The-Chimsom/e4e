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
exports.StaffDatabaseService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const staff_entity_1 = require("./staff.entity");
class StaffDatabaseService {
    constructor(dbInstance) {
        this.staffCollection = dbInstance.collection("STAFFS");
    }
    createClerkJWT(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { user: userId, identifier: staff_entity_1.StaffIdentifier.Enum.CLERK };
            const options = {
                expiresIn: "1d",
            };
            const token = jsonwebtoken_1.default.sign(payload, "secret", options);
            return token;
        });
    }
    createNurseJWT(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { user: userId, identifier: staff_entity_1.StaffIdentifier.Enum.NURSE };
            const options = {
                expiresIn: "1d",
            };
            const token = jsonwebtoken_1.default.sign(payload, "secret", options);
            return token;
        });
    }
    createClerk(staffDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const createStaff = yield this.staffCollection.insertOne(staffDetails);
            const staffId = String(createStaff.insertedId);
            const token = yield this.createClerkJWT(staffId);
            return { createStaff, token };
        });
    }
    createNurse(staffDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const createStaff = yield this.staffCollection.insertOne(staffDetails);
            const staffId = String(createStaff.insertedId);
            const token = yield this.createNurseJWT(staffId);
            return { createStaff, token };
        });
    }
}
exports.StaffDatabaseService = StaffDatabaseService;
//# sourceMappingURL=staff.db.service.js.map