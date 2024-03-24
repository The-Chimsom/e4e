"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientEntitySchema = exports.patientEntity = void 0;
const zod_1 = require("zod");
const zod_to_json_schema_1 = __importDefault(require("zod-to-json-schema"));
exports.patientEntity = zod_1.z.object({
    name: zod_1.z.string().trim(),
    email: zod_1.z.string().email(),
    phoneNumber: zod_1.z.string().email(),
    age: zod_1.z.string().trim(),
    gender: zod_1.z.string().trim(),
    paymentOption: zod_1.z.string().email(),
    appointmentDate: zod_1.z.string(),
});
exports.PatientEntitySchema = (0, zod_to_json_schema_1.default)(exports.patientEntity);
//# sourceMappingURL=patient.entity.js.map