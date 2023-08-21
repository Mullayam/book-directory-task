import vine from '@vinejs/vine'

class Helpers {
    

    /**
     * Cleans and purifies a string by converting it to lowercase, removing leading and trailing whitespace,
     * removing all spaces, replacing multiple spaces or underscores with a single hyphen,
     * and removing leading and trailing hyphens.
     *
     * @param {string} str - The string to be purified.
     * @return {string} The purified string.
     */
    Slugify(str: string): string {

        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "")

    }
    /**
     * Create a new instance of DirectorySchema.
     *
     * @return {object} A new instance of DirectorySchema.
     */
    DirectorySchema() {
        return vine.object({
            name: vine.string(),
            status: vine.boolean()
        })
    }
    /**
     * Creates a new instance of the BookSchema class.
     *
     * @return {vine.ObjectSchema} The BookSchema object.
     */
    BookSchema() {
        return vine.object({
            name: vine.string(),
            status: vine.boolean()
        })
    }
}
export default new Helpers()