import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../../jwt.verify";
import { patientEntity } from "./patient.entity";
import { PatientsService } from "./patient.db.service";
import { StaffIdentifier } from "../staff/staff.entity";
import { errorResponder, successResponder } from "../../responder";
import { AppointmentsService } from "../staff/appointments/appointment.service";

export const registerPatientValidator = function (
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const {identifier} = verifyJwt(request);

  if(identifier !== StaffIdentifier.Enum.CLERK){
    throw new Error('This user is not authorized to perform this operation')
  }
  const payload = request.body;

  const validator = patientEntity.safeParse(payload);

  if (!validator.success) {
    throw new Error("VALIDATION ERROR");
  }

  request.body = validator.data;
  return next();
};

export const registerPatientsHandler =async function(request: Request, response: Response){
    try{

    const payload = request.body;
    const databaseInstance = request.app.locals.mongoDbInstance;
    const patientsService = new PatientsService(databaseInstance);
    const scheduleApointment = new AppointmentsService(databaseInstance);

    const user = await patientsService.createPatient(payload)

    const appointment = await scheduleApointment.scheduleAppointment({
      name: payload.name, 
      appointmentDate: new Date(payload.appointmentDate),
      userId: user,
      
    })
    return successResponder(response, {user, appointment})
    }
    catch(error){
        return errorResponder(response, 400,'bad request')
    }

}
