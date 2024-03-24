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
exports.AppointmentsService = void 0;
class AppointmentsService {
    constructor(dbInstance) {
        this.appointments = dbInstance.collection("APPOINTMENTS");
    }
    scheduleAppointment(details) {
        return __awaiter(this, void 0, void 0, function* () {
            const scheduleAppointment = yield this.appointments.insertOne(details);
            return scheduleAppointment.insertedId;
        });
    }
    pendingVitalPatients(appointmentStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchPendingPatients = yield this.appointments.find({ appointmentStatus: appointmentStatus });
            return fetchPendingPatients;
        });
    }
    updateAppointmentStatus(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateStatus = yield this.appointments.updateOne(appointmentId, { appointmentStatus: 'SEEN' });
            return updateStatus.acknowledged;
        });
    }
}
exports.AppointmentsService = AppointmentsService;
//# sourceMappingURL=appointment.service.js.map