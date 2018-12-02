const fs = require('fs')
const { parseFile } = require('./fileParser')
const checksum = require("./checksum")

const reportLine = ({ asRead, getPossibles }) => {
    if (asRead.includes("?") || !hasValidChecksum(asRead)) {
        const validPossibles = getPossibles().filter(hasValidChecksum);
        if (validPossibles.length === 1) {
            return validPossibles[0];            
        }
        if (validPossibles.length > 1) {
            return `${asRead} AMB` ;            
        }
        return asRead + (asRead.includes("?") ? ' ILL' : " ERR")
    }
    return asRead
}

const hasValidChecksum = s => checksum(s) === 0

const report = (inputFile, outputFile) => {
    const accountNumbers = parseFile(inputFile)
        .map(reportLine)
    fs.writeFileSync(outputFile, accountNumbers.join('\n'))
}

module.exports = { report, reportLine }