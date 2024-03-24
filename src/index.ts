import { main } from "./main";
import express, { Express } from "express";
 import swaggerUi from "swagger-ui-express";
import { connectToDb } from "./modules/database/db";
const outputFile = require("./swagger_output.json");


const server: Express = express();

(async (app) => {
  try {
    app.use(express.json());
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(outputFile));
    const mongoClient = await connectToDb();
    app.locals.mongoDbInstance = mongoClient;
    main(app).listen(3000);

    console.log(`server started at port ${3000}`);
  } catch (error) {
    console.log(error);
  }
})(server);
