import { Request, Response } from 'express'
import { Books } from '../../factory/models/books.js'
import Helper from '../../app/utils/Helper.js'

type BookBody = {
    name: string
    dir_id: number
}
type DirectoryBody = {
    name: string
    status: number
}
export class BaseController {
    async Index(req: Request, res: Response) {
        return res.json({ message: "Hello World" })
    }
    async SearchBookByName(req: Request, res: Response) {
        try {
            let bookslug = req.params.name
            if (!bookslug) throw new Error("Please Define Book Name")
            bookslug = Helper.Slugify(bookslug)
            const getBook = await Books.findOne({ where: { slug: bookslug } })
            if (!getBook) throw new Error("Book Not Found")
            return res.json({ message: "Book Found", getBook })
        } catch (error: any) {
            return res.json({ success: false, message: "Something Went Wrong", error: error.message })

        }
    }
    async AddBook(req: Request, res: Response) {
        const { dir_id, name } = req.body as BookBody
        const createSlug = Helper.Slugify(name)
        const AddNewBook = await Books.create({ bookName: name, slug: createSlug, directoryId: dir_id })
        return res.json({ message: "AddBook", Book: AddNewBook })
    }
    async DeleteBook(req: Request, res: Response) {
        try {
            let bookslug = req.params.slug
            if (!bookslug) throw new Error("Please Define Book Name")
            bookslug = Helper.Slugify(bookslug)
            const getBook = await Books.destroy({ where: { slug: bookslug } })
            if (!getBook) throw new Error("Book Not Found")
            return res.json({ message: "Book Deleted Successfully" })
        } catch (error: any) {
            return res.json({ success: false, message: "Something Went Wrong", error: error.message })
        }
    }
    async GellAllBooks(req: Request, res: Response) {
        try {
            const BookList = await Books.findAll()
            return res.json({ message: "GellAllBooks", BookList })
        } catch (error: any) {
            return res.json({ success: false, message: "Something Went Wrong", error: error.message })
        }
    }
    

}
export default new BaseController()