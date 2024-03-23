import { main } from "./main";
import express, { Express } from "express";
import { connectToDb } from "./modules/database/db";


const server: Express = express();

(async (app) => {
  try {
    app.use(express.json());
    const mongoClient = await connectToDb();
    app.locals.mongoDbInstance = mongoClient;
    main(app).listen(3000);

    console.log(`server started at port ${3000}`);

  } catch (error) {
    console.log(error);
  }
})(server);
