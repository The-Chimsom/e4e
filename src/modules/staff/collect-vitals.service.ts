import { Collection, Db } from "mongodb";
import { VitalDetails } from "./staff.entity";

export class VitalsService {
  vitals: Collection;

  constructor(databaseInstance: Db) {
    this.vitals = databaseInstance.collection("VITALS");
  }

  async collectVitals(vitalDetails: VitalDetails) {
    const vitals = await this.vitals.insertOne({ vitalDetails})
    return vitals
  }
}