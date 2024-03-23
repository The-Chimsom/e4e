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
const main_1 = require("./main");
const express_1 = __importDefault(require("express"));
const db_1 = require("./modules/database/db");
const server = (0, express_1.default)();
((app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.use(express_1.default.json());
        const mongoClient = yield (0, db_1.connectToDb)();
        app.locals.mongoDbInstance = mongoClient;
        (0, main_1.main)(app).listen(3000);
        console.log(`server started at port ${3000}`);
    }
    catch (error) {
        console.log(error);
    }
}))(server);
//# sourceMappingURL=index.js.map