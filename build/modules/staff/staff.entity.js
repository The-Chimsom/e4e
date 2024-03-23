"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vitalDetails = exports.staffEntity = exports.StaffIdentifier = void 0;
const zod_1 = require("zod");
exports.StaffIdentifier = zod_1.z.enum(["NURSE", "CLERK"]);
exports.staffEntity = zod_1.z.object({
    name: zod_1.z.string().trim(),
    email: zod_1.z.string().trim(),
    role: exports.StaffIdentifier
});
exports.vitalDetails = zod_1.z.object({
    height: zod_1.z.string().trim(),
    weight: zod_1.z.string().trim(),
    temperature: zod_1.z.string().trim(),
    userId: zod_1.z.string().trim()
});
//# sourceMappingURL=staff.entity.js.map