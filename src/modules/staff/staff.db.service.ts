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

  async checkClerkExistence(email: string){
    const clerk = await this.staffCollection.findOne({email})
    return clerk
  }

  async createClerk(staffDetails: StaffEntity) {
    const clerk = await this.checkClerkExistence(staffDetails.email)

    if(clerk){
      const token = await this.createClerkJWT(String(clerk._id))
      return {message: 'A clerk with this mail already exists', token, clerkId: clerk._id}
    }

    const createStaff = await this.staffCollection.insertOne(staffDetails);
    const staffId = String(createStaff.insertedId);
    const token = await this.createClerkJWT(staffId);

    return { clerkId: createStaff.insertedId, token };
  }

  async createNurse(staffDetails: StaffEntity) {
    const createStaff = await this.staffCollection.insertOne(staffDetails);
    const staffId = String(createStaff.insertedId);
    const token = await this.createNurseJWT(staffId);

    return { createStaff, token };
  }

}
