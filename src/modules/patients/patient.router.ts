import { Router } from "express";
import { registerPatientValidator, registerPatientsHandler } from "./register.patient.controller";

export const patientRouter = Router()

patientRouter.post("/register-patient", registerPatientValidator, registerPatientsHandler);