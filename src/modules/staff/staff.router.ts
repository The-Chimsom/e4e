import { Router } from "express";
import { clerkSignupHandler, clerkValidator } from "./create.clerk.controller";
import { nurseSignupHandler, nurseValidator } from "./create.nurse.controller";
import { patientVitalsValidator, saveVitalsHandler } from "./collect.vitals.controller";

export const staffRouter = Router()

staffRouter.post('/register-clerk', clerkValidator, clerkSignupHandler)
staffRouter.post('/register-nurse', nurseValidator, nurseSignupHandler )
staffRouter.post("/nurse/collect-vitals", patientVitalsValidator, saveVitalsHandler);