const fs = require('fs')
const parseFile = require('./fileParser')
const checksum = require("./checksum")

const rowStatus = num => {
    if(num.includes("?")) {
        return " ILL"
    } else if (!checksum(num) == 0) {
        return " ERR"
    }
    return ''
}

const report = (inputFile, outputFile) => {
    const accountNumbers = parseFile(inputFile)
        .map(num => num + rowStatus(num))
    fs.writeFileSync("./test_output/report.txt", accountNumbers.join('\n'))
}

module.exports = report