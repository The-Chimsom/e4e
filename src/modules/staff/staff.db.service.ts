import { Collection, Db } from "mongodb";
import jwt from "jsonwebtoken";
import { StaffEntity, StaffIdentifier } from "./staff.entity";

export class StaffDatabaseService {
  staffCollection: Collection;

  constructor(dbInstance: Db) {
    this.staffCollection = dbInstance.collection("STAFFS");
  }

  async createClerkJWT(userId: string) {
    const payload = { user: userId, identifier: StaffIdentifier.Enum.CLERK };

    const options = {
      expiresIn: "1d",
    };

    const token = jwt.sign(payload, "secret", options);

    return token;
  }

  async createNurseJWT(userId: string) {
    const payload = { user: userId, identifier: StaffIdentifier.Enum.NURSE };

    const options = {
      expiresIn: "1d",
    };

    const token = jwt.sign(payload, "secret", options);

    return token;
  }

  async createClerk(staffDetails: StaffEntity) {
    const createStaff = await this.staffCollection.insertOne(staffDetails);
    const staffId = String(createStaff.insertedId);
    const token = await this.createClerkJWT(staffId);

    return { createStaff, token };
  }

  async createNurse(staffDetails: StaffEntity) {
    const createStaff = await this.staffCollection.insertOne(staffDetails);
    const staffId = String(createStaff.insertedId);
    const token = await this.createNurseJWT(staffId);

    return { createStaff, token };
  }

}
