"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const staff_router_1 = require("../modules/staff/staff.router");
const patient_router_1 = require("../modules/patients/patient.router");
function routers(expressInstance) {
    expressInstance.use('/', staff_router_1.staffRouter);
    expressInstance.use('/', patient_router_1.patientRouter);
}
exports.routers = routers;
//# sourceMappingURL=index.js.map