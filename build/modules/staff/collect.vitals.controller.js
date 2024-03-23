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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveVitalsHandler = exports.patientVitalsValidator = void 0;
const jwt_verify_1 = require("../../jwt.verify");
const staff_entity_1 = require("./staff.entity");
const collect_vitals_service_1 = require("./collect-vitals.service");
const responder_1 = require("../../responder");
const patientVitalsValidator = function (request, _response, next) {
    const { identifier, userId } = (0, jwt_verify_1.verifyJwt)(request);
    if (identifier !== staff_entity_1.StaffIdentifier.Enum.NURSE) {
        throw new Error("This user is not authorized to perform this operation");
    }
    const payload = request.body;
    const validator = staff_entity_1.vitalDetails.safeParse(payload);
    if (!validator.success) {
        throw new Error("VALIDATION ERROR");
    }
    request.body = Object.assign({ nurseId: userId }, validator.data);
    return next();
};
exports.patientVitalsValidator = patientVitalsValidator;
const saveVitalsHandler = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = request.body;
            const databaseInstance = request.app.locals.mongoDbInstance;
            const vitalService = new collect_vitals_service_1.VitalsService(databaseInstance);
            const { nurseId } = payload, rest = __rest(payload, ["nurseId"]);
            const vitals = yield vitalService.collectVitals(Object.assign({}, rest), nurseId);
            return (0, responder_1.successResponder)(response, vitals);
        }
        catch (error) {
            return (0, responder_1.errorResponder)(response, 400, 'bad request');
        }
    });
};
exports.saveVitalsHandler = saveVitalsHandler;
//# sourceMappingURL=collect.vitals.controller.js.map