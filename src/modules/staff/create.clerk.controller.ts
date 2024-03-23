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
const payload= request.body
const databaseInstance = request.app.locals.mongoDbInstance

const staffCollection = new StaffDatabaseService(databaseInstance)

const staff = await staffCollection.createClerk(payload)
return successResponder(response, staff)
}
catch(error){
    return errorResponder(response, 400, 'server error')
}
}
