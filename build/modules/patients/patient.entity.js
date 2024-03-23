"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientEntity = void 0;
const zod_1 = require("zod");
exports.patientEntity = zod_1.z.object({
    name: zod_1.z.string().trim(),
    email: zod_1.z.string().email(),
    age: zod_1.z.string().trim(),
    gender: zod_1.z.string().trim(),
    appointmentDate: zod_1.z.string()
});
//# sourceMappingURL=patient.entity.js.map