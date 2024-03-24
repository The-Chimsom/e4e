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
exports.nurseSignupHandler = exports.nurseValidator = void 0;
const staff_entity_1 = require("./staff.entity");
const staff_db_service_1 = require("./staff.db.service");
const responder_1 = require("../../responder");
const nurseValidator = (request, _response, next) => {
    const payload = request.body;
    const validator = staff_entity_1.staffEntity.safeParse(payload);
    if (!validator.success) {
        throw new Error("VALIDATION ERROR");
    }
    request.body = validator.data;
    return next();
};
exports.nurseValidator = nurseValidator;
const nurseSignupHandler = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /**
              #swagger.auto = true
              #swagger.tags = ['NURSE']
              #swagger.summary = 'nurse signup page'
              #swagger.description = 'nurse registration process'
              #swagger.operationId = 'signup-nurse'
              #swagger.consumes = ['application/json']
              #swagger.produces = ['application/json']
              #swagger.parameters['obj'] = {
               in: 'body',
               description: "This endpoint allows for the creation of the nurse entity. please fill out role as **NURSE**",
               required: true,
               schema: { $ref: '#/definitions/clerkEntity' }
              }
              
              #swagger.responses[200] = { description: 'Model for succesful operation',
               schema:  {
                  $ref: '#/definitions/responseStringPayload'
                }
              }
            */
            const payload = request.body;
            const databaseInstance = request.app.locals.mongoDbInstance;
            const staffCollection = new staff_db_service_1.StaffDatabaseService(databaseInstance);
            const staff = yield staffCollection.createNurse(payload);
            return (0, responder_1.successResponder)(response, staff);
        }
        catch (error) {
            return (0, responder_1.errorResponder)(response, 400, 'server error');
        }
    });
};
exports.nurseSignupHandler = nurseSignupHandler;
//# sourceMappingURL=create.nurse.controller.js.map