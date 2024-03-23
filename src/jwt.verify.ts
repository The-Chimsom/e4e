import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { StaffIdentifier } from "./modules/staff/staff.entity";


export interface JwtSignedPayload extends JwtPayload {
  userId: string;
  identifier: StaffIdentifier;
}

export function verifyJwt(request: Request) {
  try {
    const authHeader: string | undefined =
      request.get("authorization") || request.get("x-api-key");


    const uid = String(request.get("x-uid")).trim();

    if (!authHeader) {
      throw new Error(
        "No HTTP authorization headers"
      );
    }

    const token: string = authHeader.replace("Bearer ", "").trim();

    const payload: string | JwtPayload | JwtSignedPayload = jwt.verify(
      token,
      'secret'
    );

    if (typeof payload === "string" || !token) {
      throw new Error(
        "Invalid payload type"
      );
    }

    if (payload.user !== uid) {
      throw new Error("Invalid user id");
    }

    if (payload.identifier in StaffIdentifier.Values === false) {
      throw new Error(

        "Invalid identifier"
      );
    }

    return { userId: payload.user, identifier: payload.identifier };
  } catch (err: any) {

    console.log(err?.message, "<< very jwt error ");

    throw new Error("AUTHORIZATION_ERROR");
  }
}
