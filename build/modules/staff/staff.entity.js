"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VitalDetailsSchema = exports.vitalDetails = exports.clerkEntitySchema = exports.staffEntity = exports.StaffIdentifier = void 0;
const zod_1 = require("zod");
const zod_to_json_schema_1 = __importDefault(require("zod-to-json-schema"));
exports.StaffIdentifier = zod_1.z.enum(["NURSE", "CLERK"]);
exports.staffEntity = zod_1.z.object({
    name: zod_1.z.string().trim(),
    email: zod_1.z.string().trim(),
    role: exports.StaffIdentifier
});
exports.clerkEntitySchema = (0, zod_to_json_schema_1.default)(exports.staffEntity);
exports.vitalDetails = zod_1.z.object({
    height: zod_1.z.string().trim(),
    weight: zod_1.z.string().trim(),
    temperature: zod_1.z.string().trim(),
    bloodPressure: zod_1.z.string().trim(),
    bodyMassIndex: zod_1.z.string().trim(),
    appointmentId: zod_1.z.string().trim()
});
exports.VitalDetailsSchema = (0, zod_to_json_schema_1.default)(exports.vitalDetails);
//# sourceMappingURL=staff.entity.js.map