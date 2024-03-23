import { Collection, Db } from "mongodb";
import { PatientEntity } from "./patient.entity";

export class PatientsService {
  patientCollection: Collection;

  constructor(dbInstance: Db) {
    this.patientCollection = dbInstance.collection("PATIENTS");
  }


  async checkPatientsExistence(email: string) {
    const check = this.patientCollection.findOne({ email });
    return check;
  }

  async createPatient(details: PatientEntity) {
    const checkPatient = this.checkPatientsExistence(details.email);
    
    if (checkPatient !== null) {
      throw new Error('patient already exists')
    }
    const patient = this.patientCollection.insertOne(details);
    return patient;  
  }

}