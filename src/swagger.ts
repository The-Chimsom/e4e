import swaggerAutogen from "swagger-autogen";
import { PatientEntitySchema } from "./modules/patients/patient.entity";
import { VitalDetailsSchema, clerkEntitySchema } from "./modules/staff/staff.entity";

(async () => {
  const outputFile = `${__dirname}/swagger_output.json`;
  const endpointsFiles = [
    "./build/modules/staff/staff.router.js",
    "./build/modules/patients/patient.router.js",
    "./build/modules/appointments/appointment.router.js",
  ];

  let host = `localhost:3000`;
  let scheme = ["http"];

  const doc = {
    info: {
      version: "1.0.0",
      title: "Patient Dashboard API",
      description:
        "This document give an overview of all the endpoint expose by the HTTP backend \n\n\n **Authentication** \n\n For endpoints that requires authentication pass `X-API-KEY` and `X-UID` with there respective values as HTTP header.\n\n",
    },
    host: host,
    schemes: scheme,
    consumes: ["applications/json"],
    produces: ["applications/json"],
    securityDefinitions: {
      apiKeyAuth: {
        type: "apiKey",
        name: "x-API-KEY",
        in: "header",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "API token",
      },
      uid: {
        type: "apiKey",
        in: "header",
        name: "X-UID",
        description: "Authenticated user ID",
      },
    },
    parameters: {},
    "@definitions": {
      clerkEntity: clerkEntitySchema,
      patientEntity: PatientEntitySchema,
      vitalsSchema: VitalDetailsSchema,
      responseStringPayload: {
        type: "object",
        properties: {
          isError: {
            type: "boolean",
          },
          message: {
            type: "string",
          },
          payload: {
            type: "object",
          },
        },
      },
    },
  };
  const options = {
    openapi: null,
    language: "en-US",
    autoHeaders: true,
    autoQuery: false,
    autoBody: false,
    disableLogs: false,
  };
  await swaggerAutogen(options)(outputFile, endpointsFiles, doc).catch(
    (error: any) => console.error(error)
  );
})();
