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
Object.defineProperty(exports, "__esModule", { value: true });
exports.clerkSignupHandler = exports.clerkValidator = void 0;
const staff_entity_1 = require("./staff.entity");
const staff_db_service_1 = require("./staff.db.service");
const responder_1 = require("../../responder");
const clerkValidator = (request, _response, next) => {
    const payload = request.body;
    const validator = staff_entity_1.staffEntity.safeParse(payload);
    if (!validator.success) {
        console.log(validator.error.message);
        throw new Error("VALIDATION ERROR");
    }
    request.body = validator.data;
    return next();
};
exports.clerkValidator = clerkValidator;
const clerkSignupHandler = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = request.body;
            const databaseInstance = request.app.locals.mongoDbInstance;
            const staffCollection = new staff_db_service_1.StaffDatabaseService(databaseInstance);
            const staff = yield staffCollection.createClerk(payload);
            return (0, responder_1.successResponder)(response, staff);
        }
        catch (error) {
            return (0, responder_1.errorResponder)(response, 400, 'server error');
        }
    });
};
exports.clerkSignupHandler = clerkSignupHandler;
//# sourceMappingURL=create.clerk.controller.js.map