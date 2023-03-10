const { readFile } = require("fs/promises")
const { join } = require("path")

const { error } = require("./constants")

const User = require("./user")

const DEFAULT_OPTION = {
    maxLines: 3,
    fields: ["id", "name", "profession", "age"],
}

class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)
        if (!validation.valid) throw new Error(validation.error)
        return File.parseCSVtoJSON(content)
    }

    static async getFileContent(filePath) {
        const filename = join(__dirname, filePath)
        return (await readFile(filename)).toString("utf8")
    }

    static isValid(csvString, options = DEFAULT_OPTION) {
        const [header, ...fileWithoutReader] = csvString.split('\n')
        const isHeaderValid = header.trim() == options.fields.join(',').trim()
        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }
        const isContentLengthAccepted = (
            fileWithoutReader.length > 0 &&
            fileWithoutReader.length <= options.maxLines
        )
        if (!isContentLengthAccepted) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }
        return { valid: true }
    }

    static parseCSVtoJSON(csvString) {
        const lines = csvString.split('\n')
        // remove the first item, which is the header
        const firstLine = lines.shift()
        const header = firstLine.split(',')
        const users = lines.map(line => {
            const columns = line.split(',')
            let user = {}
            for (const index in columns) {
                user[header[index].trim()] = columns[index].trim()
            }
            return new User(user.name, user.id, user.profession, user.age)
        })
        return users
    }
}

module.exports = File