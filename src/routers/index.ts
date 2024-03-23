import { Express } from "express";
import { staffRouter } from "../modules/staff/staff.router";
import { patientRouter } from "../modules/patients/patient.router";

export function routers(expressInstance: Express) {
  expressInstance.use('/', staffRouter);
  expressInstance.use('/', patientRouter)
}
