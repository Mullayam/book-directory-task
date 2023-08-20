import { Request, Response } from 'express'
import { Books } from '../../factory/models/books.js'
import Helper from '../../app/utils/Helper.js'
import { Directory } from '../../factory/models/directory.js'

type BookBody = {
    bookName: string
    dir_id: number
}

export class BaseController {
    async Index(req: Request, res: Response) {
        return res.json({ message: "Hello World" })
    }
    /**
     * Searches for a book by name.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @return {Promise<Response<Record<string, any>>>} A JSON response containing the book if found, or an error message if not found.
     */
    async SearchBookByName(req: Request, res: Response): Promise<Response<Record<string, any>>> {
        try {
            let bookslug = req.query.bookName as string
            if (!bookslug) throw new Error("Please Define Book Name")
            bookslug = Helper.Slugify(bookslug)
            const getBook = await Books.findOne({ where: { slug: bookslug }, attributes: ["id", "bookName"] })
            if (!getBook) throw new Error("Book Not Found")
            return res.json({ message: "Book Found", getBook })
        } catch (error: any) {
            return res.json({ success: false, message: "Something Went Wrong", error: error.message })

        }
    }
    /**
     * Add a new book to the directory.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response<Record<string, any>>>} - The response object.
     */
    async AddBook(req: Request, res: Response): Promise<Response<Record<string, any>>> {
        try {
            const { bookName } = req.body as BookBody
            if (!bookName) throw new Error("BookName field is required")
            const createSlug = Helper.Slugify(bookName)
            const { id } = await Directory.findOne({ where: { dirName: bookName.charAt(0) } }) as Directory
            const AddNewBook = await Books.create({ bookName, slug: createSlug, directoryId: id })
            return res.json({ message: "New Book Added", Book: AddNewBook })
        } catch (error: any) {
            return res.json({ success: false, message: "Something Went Wrong", error: error.message })
        }
    }
    /**
     * DeleteBook function deletes a book from the database.
     *
     * @param {Request} req - the request object containing the book ID.
     * @param {Response} res - the response object.
     * @return {Promise<Response<Record<string, any>>>} - A JSON response containing the deleted book.
     */
    async DeleteBook(req: Request, res: Response): Promise<Response<Record<string, any>>> {
        try {
            let bookId = req.params.id
            if (!bookId) throw new Error("Please Define Book Name")
            const getBook = await Books.destroy({ where: { id: bookId } })
            if (!getBook) throw new Error("Book Not Found")
            return res.json({ message: "Book Deleted Successfully" })
        } catch (error: any) {
            return res.json({ success: false, message: "Something Went Wrong", error: error.message })
        }
    }
    /**
     * Retrieves all books from the database and sends a JSON response.
     *
     * @param {Request} req - the request object
     * @param {Response} res - the response object
     * @return {Promise<Response<Record<string, any>>>} A JSON response containing the all books  
     */
    async GellAllBooks(req: Request, res: Response): Promise<Response<Record<string, any>>> {
        try {

            if (req.params.dirId) {
                const BookList = await Books.findAll({ where: { directoryId: req.params.dirId }, attributes: ["id", "bookName"], order: ['bookName'], include: { model: Directory, attributes: ['dirName'] } })
                return res.json({ message: "GellAllBooks", BookList })
            }
            const BookList = await Books.findAll({ attributes: ["id", "bookName"] })
            return res.json({ message: "GellAllBooks", BookList })
        } catch (error: any) {
            return res.json({ success: false, message: "Something Went Wrong", error: error.message })
        }
    }
    async GellAllBooksInDirectory(req: Request, res: Response): Promise<Response<Record<string, any>>> {
        try {
            const dirId = req.params.dirId
            const BookList = await Books.findAll({ where: { directoryId: dirId }, attributes: ["id", "bookName"], order: ['bookName'], include: { model: Directory, attributes: ['dirName'] } })
            return res.json({ message: "GellAllBooks", BookList })
        } catch (error: any) {
            return res.json({ success: false, message: "Something Went Wrong", error: error.message })
        }
    }



}
export default new BaseController()