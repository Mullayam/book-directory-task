import { Request, Response } from 'express'
import vine from '@vinejs/vine'
import { Directory } from '../../factory/models/directory.js'
import Helper from '../../app/utils/Helper.js'
import { Books } from '../../factory/models/books.js'

class DirectoryController {
    /**
     * Retrieves all directories.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @return {Promise<Record<string, any>} The JSON response.
     */
    async GetAllDirectories(req: Request, res: Response): Promise<Response<Record<string, any>>> {
        try {
            const DirArray = await Directory.findAll()
            return res.json({ success: true, message: "List Of Directories", DirArray })
        } catch (error: any) {
            return res.json({ success: false, message: "Something Went Wrong", error: error.message })
        }
    }
    /**
     * Retrieves all directories with Array of books related to that directory.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @return {Promise<Record<string, any>} The JSON response.
     */
    async GetAllDirectoriesWithBooks(req: Request, res: Response): Promise<Response<Record<string, any>>> {
        try {
            const DirArray = await Directory.findAll({ include: [{ model: Books }] })
            return res.json({ success: true, message: "List Of Directories", DirArray })
        } catch (error: any) {
            return res.json({ success: false, message: "Something Went Wrong", error: error.message })
        }
    }
    /**
     * Creates a new directory.
     *
     * @param {Request} req - the request object
     * @param {Response} res - the response object
    * @return {Promise<Record<string, any>} The JSON response.
     */
    async CreateNewDirectory(req: Request, res: Response): Promise<Response<Record<string, any>>> {
        try {
            await vine.validate({ schema: Helper.DirectorySchema(), data: req.body })
            await Directory.create({ dirName: req.body.name.toLowerCase(), status: req.body.status })
            return res.json({ success: true, message: "New Directory Created" })
        } catch (error: any) {
            if (error.original.errno === 1062) {
                return res.json({ success: false, message: "Something Went Wrong", error: "This Directory Name Already Exist" })
            }
            return res.json({ success: false, message: "Something Went Wrong", error })
        }
    }
}
export default new DirectoryController()