import { Router } from "express";
import { pendingPatientVitalsHandler, pendingPatientVitalsValidator } from "./fetchAppointments.controller";

export const appointmentRouter = Router()

appointmentRouter.get("/vitals-appointments", pendingPatientVitalsValidator, pendingPatientVitalsHandler);