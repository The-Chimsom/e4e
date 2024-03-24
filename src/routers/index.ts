import { Express } from "express";
import { staffRouter } from "../modules/staff/staff.router";
import { patientRouter } from "../modules/patients/patient.router";
import { appointmentRouter } from "../modules/appointments/appointment.router";

export function routers(expressInstance: Express) {
  expressInstance.use('/', staffRouter);
  expressInstance.use('/', patientRouter)
  expressInstance.use("/", appointmentRouter);
}
