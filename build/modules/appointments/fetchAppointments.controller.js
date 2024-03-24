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
exports.pendingPatientVitalsHandler = exports.pendingPatientVitalsValidator = void 0;
const staff_entity_1 = require("../staff/staff.entity");
const jwt_verify_1 = require("../../jwt.verify");
const appointment_service_1 = require("./appointment.service");
const apointment_entity_1 = require("./apointment.entity");
const responder_1 = require("../../responder");
const pendingPatientVitalsValidator = function (request, _response, next) {
    const { identifier } = (0, jwt_verify_1.verifyJwt)(request);
    if (identifier !== staff_entity_1.StaffIdentifier.Enum.NURSE) {
        throw new Error("This user is not authorized to perform this operation");
    }
    return next();
};
exports.pendingPatientVitalsValidator = pendingPatientVitalsValidator;
const pendingPatientVitalsHandler = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /**
            #swagger.auto = true
            #swagger.tags = ['APPOINTMENT']
            #swagger.summary = 'fetches all patients that have been booked for vital collection'
            #swagger.description = 'allows the nurse entity to see all  patient booked for vitals'
            #swagger.operationId = 'appointment'
            #swagger.security = [{"apiKeyAuth": [], "uid": []}]
            #swagger.consumes = ['application/json']
            #swagger.produces = ['application/json']
            
            #swagger.responses[200] = { description: 'Model for succesful operation',
             schema:  {
                $ref: '#/definitions/responseStringPayload'
              }
            }
            */
            const databaseInstance = request.app.locals.mongoDbInstance;
            const appointmentService = new appointment_service_1.AppointmentsService(databaseInstance);
            const uncollectedVitals = yield appointmentService.pendingVitalPatients(apointment_entity_1.AppointmentStatus.Enum["NOT-SEEN"]);
            return (0, responder_1.successResponder)(response, uncollectedVitals);
        }
        catch (error) {
            // #swagger.responses[500] = { description: 'Server failure.', schema: { $ref: '#/definitions/responseStringPayload' }}
            // #swagger.responses[400] = { description: 'Bad Request', schema: { $ref: '#/definitions/responseStringPayload' }}
            console.log(error);
            return (0, responder_1.errorResponder)(response, 400, "bad request");
        }
    });
};
exports.pendingPatientVitalsHandler = pendingPatientVitalsHandler;
//# sourceMappingURL=fetchAppointments.controller.js.map