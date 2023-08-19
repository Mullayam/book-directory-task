
import { Response, Request, Router } from 'express'
import { HttpException } from '../app/lib/ExceptionHandler.js';

export class AppRoutes {
    constructor(public router: Router = Router()) {
        this.router = router
        this.PublicRoutes();      
        this.UnhandledRoutes();
    }


    /**
     * Defines the public routes for the API.
     *
     * @private
     * @returns {void}
     */
    private PublicRoutes(): void {
        this.router.get("/test", (req: Request, res: Response) => {
            res.json({ ok: "REport" })
        })
    }    
    
    /**
     * Handles unhandled routes by throwing a HttpException.     *
      
     * @return {void} 
     */
    private UnhandledRoutes(): void {
        this.router.use("*", () => { throw new HttpException({ name: "NOT_FOUND", message: "Route Error", stack: "Route Not Found" }) })
    }
}