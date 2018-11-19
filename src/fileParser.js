const fs = require('fs')
const toColumns = require('./columnExtractor')
const digitParser = require('./digitParser')

const parseRow = string => {
    const digits = toColumns(string).map(digitParser)
    return {
        asRead: digits
            .map(({ initialMatch, alternatives }) => initialMatch || alternatives[0] || '?')
            .join(''), 
        getPossibles: () => combine(digits)
    }
}

const combine = (digits, acc = [""]) => {
    if (digits.length === 0) {
        return acc;
    }
    
    const [{ initialMatch, alternatives }, ...rest] = digits

    const allPossibleValues = initialMatch ? [initialMatch, ...alternatives] : alternatives

    return combine(rest, flatMap(s => allPossibleValues.map(a => s.concat(a)), acc))
}

// {
//     asRead: '1234595342',
//     possible: ['5435653', '453455643']
// }

const flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], [])

const parseRows = string =>
    string.split("\n\n").map(parseRow)

const parseFile = fileName =>
    parseRows(fs.readFileSync(fileName).toString())

module.exports = { parseFile, combine };


// '032456754' -> '032456754 CHECKSUM'
// '03245675?' -> '03245675? ILL'
// '03245675?' -> '03245675? AMB'

// {
//     accountNumber: '12345?457',
//     // match: '123455457',
//     // error: 'ILL' || 'AMB'
// }

// {
//     accountNumber: '12345?45?',
//     error: 'AMB'
//     alternatives: [[1], [7,9]]
// }