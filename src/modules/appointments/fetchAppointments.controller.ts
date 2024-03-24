import { NextFunction, Request, Response } from "express";
import { StaffIdentifier } from "../staff/staff.entity";
import { verifyJwt } from "../../jwt.verify";
import { AppointmentsService } from "./appointment.service";
import { AppointmentStatus } from "./apointment.entity";
import { errorResponder, successResponder } from "../../responder";

export const pendingPatientVitalsValidator = function (
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { identifier } = verifyJwt(request);

  if (identifier !== StaffIdentifier.Enum.NURSE) {
    throw new Error("This user is not authorized to perform this operation");
  }

  return next();
};


export const pendingPatientVitalsHandler = async function ( request: Request, response: Response) {
  try{
    /**
    #swagger.auto = true
    #swagger.tags = ['APPOINTMENT']
    #swagger.summary = 'fetches all patients that have been booked for vital collection'
    #swagger.description = 'allows the nurse entity to see all  patient booked for vitals'
    #swagger.operationId = 'appointment'
    #swagger.security = [{"apiKeyAuth": [], "uid": []}]
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    
    #swagger.responses[200] = { description: 'Model for succesful operation',
     schema:  {  
        $ref: '#/definitions/responseStringPayload' 
      }     
    }
    */
    const databaseInstance = request.app.locals.mongoDbInstance;
    const appointmentService = new AppointmentsService(databaseInstance);

    const uncollectedVitals = await appointmentService.pendingVitalPatients(
      AppointmentStatus.Enum["NOT-SEEN"]
    );
    return successResponder(response, uncollectedVitals);
  }
   catch(error){
     // #swagger.responses[500] = { description: 'Server failure.', schema: { $ref: '#/definitions/responseStringPayload' }}
     // #swagger.responses[400] = { description: 'Bad Request', schema: { $ref: '#/definitions/responseStringPayload' }}
     console.log(error);
     return errorResponder(response, 400, "bad request");
   }
};