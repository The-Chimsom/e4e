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
exports.VitalsService = void 0;
class VitalsService {
    constructor(databaseInstance) {
        this.vitals = databaseInstance.collection("VITALS");
    }
    collectVitals(vitalDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const vitals = yield this.vitals.insertOne({ vitalDetails });
            return vitals;
        });
    }
}
exports.VitalsService = VitalsService;
//# sourceMappingURL=collect-vitals.service.js.map