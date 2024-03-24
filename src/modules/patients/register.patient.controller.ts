import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../../jwt.verify";
import { patientEntity } from "./patient.entity";
import { PatientsService } from "./patient.db.service";
import { StaffIdentifier } from "../staff/staff.entity";
import { errorResponder, successResponder } from "../../responder";
import { AppointmentsService } from "../appointments/appointment.service";
import { AppointmentStatus } from "../appointments/apointment.entity";

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
    /**
    #swagger.auto = true
    #swagger.tags = ['PATIENT']
    #swagger.summary = 'registers new patients'
    #swagger.description = 'patient's registration process'
    #swagger.operationId = 'register-patients'
    #swagger.security = [{"apiKeyAuth": [], "uid": []}]
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['obj'] = {
     in: 'body',
     description: 'This route lets a clerk register a patient and authomatically books them for vital collection by a nurse.
     This is a Protected endpoint that takes in the schema stipulated below. It requires the clerk\'s token and and id passed in as x-api-key and x-uid, respectively.',
     required: true,
     schema: { $ref: '#/definitions/patientEntity' }
    }
    
    #swagger.responses[200] = { description: 'Authorized returning user',
     schema:  {  
        $ref: '#/definitions/responseStringPayload' 
      }     
    }
    */

      const payload = request.body;
      const databaseInstance = request.app.locals.mongoDbInstance;
      const patientsService = new PatientsService(databaseInstance);
      const scheduleApointment = new AppointmentsService(databaseInstance);

      const user = await patientsService.createPatient(payload);

      const appointment = await scheduleApointment.scheduleAppointment({
        name: payload.name,
        appointmentDate: new Date(payload.appointmentDate),
        userId: user,
        appointmentStatus: AppointmentStatus.Enum["NOT-SEEN"]
      });
      return successResponder(response, { user, appointmentId: appointment });
    }
    catch(error){
      // #swagger.responses[500] = { description: 'Server failure.', schema: { $ref: '#/definitions/responseStringPayload' }}
      // #swagger.responses[400] = { description: 'Bad Request', schema: { $ref: '#/definitions/responseStringPayload' }}
      return errorResponder(response, 400, "bad request");
    }

}
