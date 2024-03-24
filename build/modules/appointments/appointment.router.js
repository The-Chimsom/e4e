"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRouter = void 0;
const express_1 = require("express");
const fetchAppointments_controller_1 = require("./fetchAppointments.controller");
exports.appointmentRouter = (0, express_1.Router)();
exports.appointmentRouter.get("/vitals-appointments", fetchAppointments_controller_1.pendingPatientVitalsValidator, fetchAppointments_controller_1.pendingPatientVitalsHandler);
//# sourceMappingURL=appointment.router.js.map