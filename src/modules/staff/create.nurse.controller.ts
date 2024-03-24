import { NextFunction, Request, Response } from "express";
import { staffEntity } from "./staff.entity";
import { StaffDatabaseService } from "./staff.db.service";
import { errorResponder, successResponder } from "../../responder";

export const nurseValidator = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const payload = request.body;

  const validator = staffEntity.safeParse(payload);

  if (!validator.success) {
    throw new Error("VALIDATION ERROR");
  }

  request.body = validator.data;
  return next();
};

export const nurseSignupHandler = async function(request: Request, response: Response){
try{
  /**
    #swagger.auto = true
    #swagger.tags = ['NURSE']
    #swagger.summary = 'nurse signup page'
    #swagger.description = 'nurse registration process'
    #swagger.operationId = 'signup-nurse'
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['obj'] = {
     in: 'body',
     description: "This endpoint allows for the creation of the nurse entity. please fill out role as **NURSE**",
     required: true,
     schema: { $ref: '#/definitions/clerkEntity' }
    }
    
    #swagger.responses[200] = { description: 'Model for succesful operation',
     schema:  {  
        $ref: '#/definitions/responseStringPayload' 
      }     
    }
  */

  const payload = request.body;
  const databaseInstance = request.app.locals.mongoDbInstance;

  const staffCollection = new StaffDatabaseService(databaseInstance);

  const staff = await staffCollection.createNurse(payload);
  return successResponder(response, staff);
}
catch(error){
    return errorResponder(response, 400, 'server error')
}
}