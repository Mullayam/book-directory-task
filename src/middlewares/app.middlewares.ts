import Helpers from "../app/utils/Helper.js";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";


export const SECRET_KEY: Secret = `${process.env.JWT_SECRET_TOKEN}`
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
export class Middlewares {

  //  check api key  
  public static isApiProtected(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Checking API KEY")
      const headers = req.headers;
      const apiKey = headers["api_key"] || undefined;
      if (typeof apiKey === "undefined") {
        return res.status(404).json({
          return: false,
          status_code: 404,
          message: "API_KEY is Required",
        });
      }
      if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({
          return: false,
          status_code: 412,
          message: "Invalid KEY, Check API KEY",
        });
      }
      next();
    } catch (error: any) {
      res.send({
        success: false,
        message: error.message,
      });
      res.end();
    }

  }
  /**
   * Sets the X-Request-Id and X-Platform headers in the request and response objects.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
  public static IRequestHeaders(req: Request, res: Response, next: NextFunction) {
    const requestId = Helpers.RequestId();
    req.headers['X-Request-Id'] = requestId;
    res.setHeader('X-Request-Id', requestId);
    res.setHeader('X-Platform', "ENJOYS");
    next();
  }
}