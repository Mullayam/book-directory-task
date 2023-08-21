import { Response as ExpressResponse } from "express";


export class SendResponse {
    static JSON(res: ExpressResponse, response: any, code: number = 200): void {
        res.status(code).json(response);
    }
    static Error(res: ExpressResponse, response: any, code: number = 500): void {
        res.status(code).send(response)
    }

}