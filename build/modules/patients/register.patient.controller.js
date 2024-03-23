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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPatientsHandler = exports.registerPatientValidator = void 0;
const jwt_verify_1 = require("../../jwt.verify");
const patient_entity_1 = require("./patient.entity");
const patient_db_service_1 = require("./patient.db.service");
const staff_entity_1 = require("../staff/staff.entity");
const responder_1 = require("../../responder");
const appointment_service_1 = require("../staff/appointments/appointment.service");
const registerPatientValidator = function (request, _response, next) {
    const { identifier } = (0, jwt_verify_1.verifyJwt)(request);
    if (identifier !== staff_entity_1.StaffIdentifier.Enum.CLERK) {
        throw new Error('This user is not authorized to perform this operation');
    }
    const payload = request.body;
    const validator = patient_entity_1.patientEntity.safeParse(payload);
    if (!validator.success) {
        throw new Error("VALIDATION ERROR");
    }
    request.body = validator.data;
    return next();
};
exports.registerPatientValidator = registerPatientValidator;
const registerPatientsHandler = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = request.body;
            const databaseInstance = request.app.locals.mongoDbInstance;
            const patientsService = new patient_db_service_1.PatientsService(databaseInstance);
            const scheduleApointment = new appointment_service_1.AppointmentsService(databaseInstance);
            const user = yield patientsService.createPatient(payload);
            const appointment = yield scheduleApointment.scheduleAppointment({
                name: payload.name,
                appointmentDate: new Date(payload.appointmentDate),
                userId: user,
            });
            return (0, responder_1.successResponder)(response, { user, appointment });
        }
        catch (error) {
            return (0, responder_1.errorResponder)(response, 400, 'bad request');
        }
    });
};
exports.registerPatientsHandler = registerPatientsHandler;
//# sourceMappingURL=register.patient.controller.js.map