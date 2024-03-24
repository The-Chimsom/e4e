import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../../jwt.verify";
import { StaffIdentifier, vitalDetails } from "./staff.entity";
import { VitalsService } from "./collect-vitals.service";
import { errorResponder, successResponder } from "../../responder";
import { AppointmentsService } from "../appointments/appointment.service";

export const patientVitalsValidator = function (
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { identifier } = verifyJwt(request);

  if (identifier !== StaffIdentifier.Enum.NURSE) {
    throw new Error("This user is not authorized to perform this operation");
  }
  const payload = request.body;

  const validator = vitalDetails.safeParse(payload);

  if (!validator.success) {
    throw new Error("VALIDATION ERROR");
  }

  request.body = validator.data;
  return next();
};

export const saveVitalsHandler = async function(request: Request, response: Response){
    try{
      /**
    #swagger.auto = true
    #swagger.tags = ['NURSE']
    #swagger.summary = 'collection of vitals by the nurse entity'
    #swagger.description = 'allows the nurse entity to collect patient vitals'
    #swagger.operationId = 'vitals'
    #swagger.security = [{"apiKeyAuth": [], "uid": []}]
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['obj'] = {
     in: 'body',
     description: "This is a protected endpoint that allows the collection of patient\'s vitals by the nurse entitiy. Please pass in the token given to the nurse while registering, and the nurse\'s id as the token and x-api-key, respectively",
     required: true,
     schema: { $ref: '#/definitions/vitalsSchema' }
    }
    
    #swagger.responses[200] = { description: 'Model for succesful operation',
     schema:  {  
        $ref: '#/definitions/responseStringPayload' 
      }     
    }
   */
      const payload = request.body;
      const databaseInstance = request.app.locals.mongoDbInstance;
      const vitalService = new VitalsService(databaseInstance);
      const appointmentService = new AppointmentsService(databaseInstance);


      const vitals = await vitalService.collectVitals(payload);

      await appointmentService.updateAppointmentStatus(vitals.insertedId);

      return successResponder(response, vitals);
    }catch(error){
      // #swagger.responses[500] = { description: 'Server failure.', schema: { $ref: '#/definitions/responseStringPayload' }}
      // #swagger.responses[400] = { description: 'Bad Request', schema: { $ref: '#/definitions/responseStringPayload' }}
      return errorResponder(response, 400, "bad request");
    }
}


