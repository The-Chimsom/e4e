import { Express, NextFunction, Request, Response } from "express";

import { errorResponder } from "./responder";
import { routers } from "./routers";

export const main = function (server: Express) {
  server.get("/test", function (_request: Request, response: Response) {
    response.send("accessed");
  });

  routers(server);
  server.use(
    (
      error: Error,
      _request: Request,
      response: Response,
      _next: NextFunction
    ) => {
      return errorResponder(response, 400, error.message);
    }
  );

  return server;
};
