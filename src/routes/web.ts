import { Router } from 'express'
import { HttpException } from '../app/lib/ExceptionHandler.js';
import { BaseController,Directory } from '../controllers/index.js'

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
        /** Books Routes */
        this.router.get("/test",BaseController.Index )
        this.router.get("/get-all-books",BaseController.GellAllBooks)
        this.router.get("/book/:name",BaseController.SearchBookByName)
        this.router.post("/add-new-book",BaseController.AddBook)
        this.router.delete("/delete/:slug",BaseController.DeleteBook)

        /** Directories Routes */
        this.router.get("/list-only-directories",Directory.GetAllDirectories)
        this.router.get("/list-directories-with-books",Directory.GetAllDirectoriesWithBooks)
        this.router.post("/create",Directory.CreateNewDirectory)

    }
    /**
     * Handles unhandled routes by throwing a HttpException.     *
      
     * @return {void} 
     */
    private UnhandledRoutes(): void {
        this.router.use("*", () => { throw new HttpException({ name: "NOT_FOUND", message: "Route Error", stack: "Route Not Found" }) })
    }
}