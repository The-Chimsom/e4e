import { Collection, Db } from "mongodb";
import { PatientEntity } from "./patient.entity";

export class PatientsService {
  patientCollection: Collection;

  constructor(dbInstance: Db) {
    this.patientCollection = dbInstance.collection("PATIENTS");
  }

  async checkPatientsExistence(email: string) {
    const check = await this.patientCollection.findOne({ email });
    return check;
  }

  async createPatient(details: PatientEntity) {
    const checkPatient = await this.checkPatientsExistence(details.email);
    
    if (!checkPatient) {
      
    const patient = await this.patientCollection.insertOne(details);
    return patient.insertedId;  
    }
    throw new Error("patient already exists");
  }

}