import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../../jwt.verify";
import { StaffIdentifier, vitalDetails } from "./staff.entity";
import { VitalsService } from "./collect-vitals.service";
import { errorResponder, successResponder } from "../../responder";

export const patientVitalsValidator = function (
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { identifier, userId } = verifyJwt(request);

  if (identifier !== StaffIdentifier.Enum.NURSE) {
    throw new Error("This user is not authorized to perform this operation");
  }
  const payload = request.body;

  const validator = vitalDetails.safeParse(payload);

  if (!validator.success) {
    throw new Error("VALIDATION ERROR");
  }

  request.body = {nurseId: userId, ...validator.data};
  return next();
};

export const saveVitalsHandler = async function(request: Request, response: Response){
    try{

    const payload = request.body;
    const databaseInstance = request.app.locals.mongoDbInstance;
    const vitalService = new VitalsService(databaseInstance);

    const {nurseId, ...rest} = payload

    const vitals = await vitalService.collectVitals( {...rest}, nurseId )
    return successResponder(response, vitals)
    }catch(error){
        return errorResponder(response, 400, 'bad request')
    }
}


