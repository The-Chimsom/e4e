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
exports.saveVitalsHandler = exports.patientVitalsValidator = void 0;
const jwt_verify_1 = require("../../jwt.verify");
const staff_entity_1 = require("./staff.entity");
const collect_vitals_service_1 = require("./collect-vitals.service");
const responder_1 = require("../../responder");
const appointment_service_1 = require("../appointments/appointment.service");
const patientVitalsValidator = function (request, _response, next) {
    const { identifier } = (0, jwt_verify_1.verifyJwt)(request);
    if (identifier !== staff_entity_1.StaffIdentifier.Enum.NURSE) {
        throw new Error("This user is not authorized to perform this operation");
    }
    const payload = request.body;
    const validator = staff_entity_1.vitalDetails.safeParse(payload);
    if (!validator.success) {
        throw new Error("VALIDATION ERROR");
    }
    request.body = validator.data;
    return next();
};
exports.patientVitalsValidator = patientVitalsValidator;
const saveVitalsHandler = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /**
          #swagger.auto = true
          #swagger.tags = ['NURSE']
          #swagger.summary = 'collection of vitals by the nurse entity'
          #swagger.description = 'allows the nurse entity to collect patient vitals'
          #swagger.operationId = 'vitals'
          #swagger.security = [{"apiKeyAuth": [], "uid": []}]
          #swagger.consumes = ['application/json']
          #swagger.produces = ['application/json']
          #swagger.parameters['obj'] = {
           in: 'body',
           description: "This is a protected endpoint that allows the collection of patient\'s vitals by the nurse entitiy. Please pass in the token given to the nurse while registering, and the nurse\'s id as the token and x-api-key, respectively",
           required: true,
           schema: { $ref: '#/definitions/vitalsSchema' }
          }
          
          #swagger.responses[200] = { description: 'Model for succesful operation',
           schema:  {
              $ref: '#/definitions/responseStringPayload'
            }
          }
         */
            const payload = request.body;
            const databaseInstance = request.app.locals.mongoDbInstance;
            const vitalService = new collect_vitals_service_1.VitalsService(databaseInstance);
            const appointmentService = new appointment_service_1.AppointmentsService(databaseInstance);
            const appointment = yield appointmentService.findAppointment(payload.appointmentId);
            if (!appointment) {
                throw new Error('Please Refer patient to book an appointment');
            }
            const vitals = yield vitalService.collectVitals(payload);
            yield appointmentService.updateAppointmentStatus(vitals.insertedId);
            return (0, responder_1.successResponder)(response, vitals);
        }
        catch (error) {
            // #swagger.responses[500] = { description: 'Server failure.', schema: { $ref: '#/definitions/responseStringPayload' }}
            // #swagger.responses[400] = { description: 'Bad Request', schema: { $ref: '#/definitions/responseStringPayload' }}
            return (0, responder_1.errorResponder)(response, 400, "bad request");
        }
    });
};
exports.saveVitalsHandler = saveVitalsHandler;
//# sourceMappingURL=collect.vitals.controller.js.map