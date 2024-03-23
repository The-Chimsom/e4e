"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRouter = void 0;
const express_1 = require("express");
const register_patient_controller_1 = require("./register.patient.controller");
exports.patientRouter = (0, express_1.Router)();
exports.patientRouter.post("/register-patient", register_patient_controller_1.registerPatientValidator, register_patient_controller_1.registerPatientsHandler);
//# sourceMappingURL=patient.router.js.map