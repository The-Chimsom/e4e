import { Collection, Db } from "mongodb";
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
}
