import { Collection, Db, ObjectId } from "mongodb";
import { AppointmentDetails } from "./apointment.entity";

export class AppointmentsService {
  appointments: Collection;
  constructor(dbInstance: Db) {
    this.appointments = dbInstance.collection("APPOINTMENTS");
  }

  async scheduleAppointment(details: AppointmentDetails) {
    const scheduleAppointment = await this.appointments.insertOne(details);
    return scheduleAppointment.insertedId
  }

  async pendingVitalPatients(appointmentStatus: string){
    const fetchPendingPatients = await this.appointments.find({ appointmentStatus: appointmentStatus });
    return fetchPendingPatients
  }

  async updateAppointmentStatus(appointmentId: ObjectId){
    const updateStatus = await this.appointments.updateOne(appointmentId, {appointmentStatus: 'SEEN'})
    return updateStatus.acknowledged
  }
}
