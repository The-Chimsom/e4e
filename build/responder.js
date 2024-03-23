"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponder = exports.successResponder = void 0;
function successResponder(response, payload, description = '') {
    return response.status(200).json({
        error: false,
        description,
        payload
    });
}
exports.successResponder = successResponder;
function errorResponder(response, statusCode, description) {
    return response.status(statusCode).json({
        error: true,
        description,
        payload: null
    });
}
exports.errorResponder = errorResponder;
//# sourceMappingURL=responder.js.map