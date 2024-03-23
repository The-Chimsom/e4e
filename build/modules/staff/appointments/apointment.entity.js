"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentDetails = exports.AppointmentStatus = void 0;
const mongodb_1 = require("mongodb");
const zod_1 = require("zod");
exports.AppointmentStatus = zod_1.z.enum(['SEEN', 'NOT-SEEN']);
exports.appointmentDetails = zod_1.z.object({
    name: zod_1.z.string().trim(),
    userId: zod_1.z.instanceof(mongodb_1.ObjectId),
    appointmentDate: zod_1.z.date(),
});
//# sourceMappingURL=apointment.entity.js.map