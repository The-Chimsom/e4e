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
exports.PatientsService = void 0;
class PatientsService {
    constructor(dbInstance) {
        this.patientCollection = dbInstance.collection("PATIENTS");
    }
    checkPatientsExistence(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.patientCollection.findOne({ email });
            return check;
        });
    }
    createPatient(details) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkPatient = yield this.checkPatientsExistence(details.email);
            if (!checkPatient) {
                const patient = yield this.patientCollection.insertOne(details);
                return patient.insertedId;
            }
            throw new Error("patient already exists");
        });
    }
}
exports.PatientsService = PatientsService;
//# sourceMappingURL=patient.db.service.js.map