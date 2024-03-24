import { NextFunction, Request, Response } from "express";
import { staffEntity } from "./staff.entity";
import { StaffDatabaseService } from "./staff.db.service";
import { errorResponder, successResponder } from "../../responder";

export const clerkValidator = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const payload = request.body;

  const validator = staffEntity.safeParse(payload);

  if (!validator.success) {
    console.log(validator.error.message)
    throw new Error("VALIDATION ERROR");
  }

  request.body = validator.data;
  return next();
};

export const clerkSignupHandler = async function(request: Request, response: Response){
try{
  /**
    #swagger.auto = true
    #swagger.tags = ['CLERK']
    #swagger.summary = 'clerk signup page'
    #swagger.description = 'clerk's registration process'
    #swagger.operationId = 'signup-clerk'
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['obj'] = {
     in: 'body',
     description: "This endpoint allows for the creation of the clerk entity. please fill out role as **CLERK**",
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

  const staff = await staffCollection.createClerk(payload);
  return successResponder(response, staff);
}
catch(error){
  // #swagger.responses[500] = { description: 'Server failure.', schema: { $ref: '#/definitions/responseStringPayload' }}
  // #swagger.responses[400] = { description: 'Bad Request', schema: { $ref: '#/definitions/responseStringPayload' }}
  return errorResponder(response, 400, "Bad Request");
}
}
