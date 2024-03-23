"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const responder_1 = require("./responder");
const routers_1 = require("./routers");
const main = function (server) {
    server.get("/test", function (_request, response) {
        response.send("accessed");
    });
    (0, routers_1.routers)(server);
    server.use((error, _request, response, _next) => {
        return (0, responder_1.errorResponder)(response, 400, error.message);
    });
    return server;
};
exports.main = main;
//# sourceMappingURL=main.js.map