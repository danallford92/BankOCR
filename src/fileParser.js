const fs = require('fs')
const toColumns = require('./columnExtractor')
const digitParser = require('./digitParser')

const parseRow = string =>
    toColumns(string).map(digitParser).join('')

const parseRows = string =>
    string.split("\n\n").map(parseRow)

const parseFile = fileName =>
    parseRows(fs.readFileSync(fileName).toString())

module.exports = parseFile;