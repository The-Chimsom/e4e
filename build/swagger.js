"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const patient_entity_1 = require("./modules/patients/patient.entity");
const staff_entity_1 = require("./modules/staff/staff.entity");
(() => __awaiter(void 0, void 0, void 0, function* () {
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
            description: "This document give an overview of all the endpoint expose by the HTTP backend \n\n\n **Authentication** \n\n For endpoints that requires authentication pass `X-API-KEY` and `X-UID` with there respective values as HTTP header.\n\n",
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
            clerkEntity: staff_entity_1.clerkEntitySchema,
            patientEntity: patient_entity_1.PatientEntitySchema,
            vitalsSchema: staff_entity_1.VitalDetailsSchema,
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
    yield (0, swagger_autogen_1.default)(options)(outputFile, endpointsFiles, doc).catch((error) => console.error(error));
}))();
//# sourceMappingURL=swagger.js.map