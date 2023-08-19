import { Request, Response } from 'express'
class BaseController {
    async Index(req: Request, res: Response) {
        return res.json({ message: "Hello World" })
    }
}