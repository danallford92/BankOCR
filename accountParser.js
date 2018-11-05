const fileReader = require('./fileReader')
const digitParser = require('./digitParser')

function accountParser(string) {
    return fileReader(string).map(digitParser).join('')
}

module.exports = accountParser;