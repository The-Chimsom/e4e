"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const staff_entity_1 = require("./modules/staff/staff.entity");
function verifyJwt(request) {
    try {
        const authHeader = request.get("authorization") || request.get("x-api-key");
        const uid = String(request.get("x-uid")).trim();
        if (!authHeader) {
            throw new Error("No HTTP authorization headers");
        }
        const token = authHeader.replace("Bearer ", "").trim();
        const payload = jsonwebtoken_1.default.verify(token, 'secret');
        if (typeof payload === "string" || !token) {
            throw new Error("Invalid payload type");
        }
        if (payload.user !== uid) {
            throw new Error("Invalid user id");
        }
        if (payload.identifier in staff_entity_1.StaffIdentifier.Values === false) {
            throw new Error("Invalid identifier");
        }
        return { userId: payload.user, identifier: payload.identifier };
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message, "<< very jwt error ");
        throw new Error("AUTHORIZATION_ERROR");
    }
}
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.verify.js.map