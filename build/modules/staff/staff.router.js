"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffRouter = void 0;
const express_1 = require("express");
const create_clerk_controller_1 = require("./create.clerk.controller");
const create_nurse_controller_1 = require("./create.nurse.controller");
const collect_vitals_controller_1 = require("./collect.vitals.controller");
exports.staffRouter = (0, express_1.Router)();
exports.staffRouter.post('/register-clerk', create_clerk_controller_1.clerkValidator, create_clerk_controller_1.clerkSignupHandler);
exports.staffRouter.post('/register-nurse', create_nurse_controller_1.nurseValidator, create_nurse_controller_1.nurseSignupHandler);
exports.staffRouter.post("/nurse/save-vitals", collect_vitals_controller_1.patientVitalsValidator, collect_vitals_controller_1.saveVitalsHandler);
//# sourceMappingURL=staff.router.js.map