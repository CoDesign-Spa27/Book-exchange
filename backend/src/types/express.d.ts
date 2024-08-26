import { Request } from "express";
import User from "../middlewares/models/User";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Adjust the type according to what you attach to the request
    }
  }
}

export {};
